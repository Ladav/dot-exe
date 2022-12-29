import { range } from 'radash'
import { MouseEvent, useCallback, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { AiOutlineRight } from 'react-icons/ai'
import { toast } from 'react-hot-toast'
import { Menu, useContextMenu } from 'react-contexify'
import { FiEdit3 } from 'react-icons/fi'
import { Popover } from '@headlessui/react'
import { SortOrder } from '../../enums/sort-order.enum'
import usePersistedState from '../../hooks/use-persisted-state'
import { deletePageById, getPageList } from '../../queries/page.queries'
import { queryClient } from '../../constants/client'
import { Confirm } from '../confirm'

export default function PageList() {
  const navigate = useNavigate()
  const { pageId } = useParams() as { pageId: string }
  const [sortOrder] = usePersistedState<SortOrder>('sortOrder', SortOrder.FILE_A_TO_Z)
  const pageListQueryKey = ['page-list', { sortOrder }] as const

  const pagesQ = useQuery(pageListQueryKey, ({ queryKey }) => {
    const [, params] = queryKey
    return getPageList(params)
  })

  const deletePageM = useMutation(deletePageById, {
    onMutate: (pageId) => {
      const pages = queryClient.getQueryData<Awaited<ReturnType<typeof getPageList>>>(pageListQueryKey)
      queryClient.setQueryData<Awaited<ReturnType<typeof getPageList>>>(pageListQueryKey, (prev) => {
        if (prev) {
          return prev?.filter((page) => page.id !== +pageId)
        }
        return []
      })

      return pages
    },
    onError: (error, vars, prevState) => {
      queryClient.setQueryData(pageListQueryKey, prevState)
    },
    onSuccess: (data, pageId, prevState) => {
      toast.success('page deleted')
      const pageIdx = prevState?.findIndex((page) => page.id === +pageId)
      if (typeof pageIdx !== 'number' || !prevState) {
        navigate('/page')
        return
      }

      const previousPage = prevState[pageIdx - 1]
      if (previousPage) {
        navigate(`/page/${previousPage.id}`)
        return
      }

      const nextPage = prevState[pageIdx + 1]
      if (nextPage) {
        navigate(`/page/${nextPage.id}`)
        return
      }

      navigate('/page')
    },
  })

  const onDelete = useCallback(
    (id: number) => {
      deletePageM.mutate(id)
    },
    [deletePageM],
  )

  return (
    <ul className="mt-2 w-full space-y-1">
      {useMemo(() => {
        if (pagesQ.status === 'loading') {
          return [...range(0, 2)].map((idx) => (
            <li key={idx} className="icon-container !justify-start !px-2 text-sm !py-0.5">
              ...
            </li>
          ))
        }

        if (pagesQ.data) {
          return pagesQ.data.map((page) => (
            <ListItem key={page.id} activePageId={pageId} page={page} onDelete={onDelete} />
          ))
        }

        return null
      }, [onDelete, pageId, pagesQ.data, pagesQ.status])}
    </ul>
  )
}

type ListItemProps = {
  activePageId: string
  page: Awaited<ReturnType<typeof getPageList>>[0]
  onDelete: (id: number) => void
}

function ListItem({ activePageId, page, onDelete }: ListItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const MENU_ID = `page-menu-${page.id}`
  const { show } = useContextMenu({
    id: MENU_ID,
    props: {
      pageId: page.id,
    },
  })

  const displayMenu = useCallback(
    (event: MouseEvent<HTMLLIElement>) => {
      show({ event })
    },
    [show],
  )

  const handleDeletePage = useCallback(() => {
    onDelete(page.id)
  }, [onDelete, page.id])

  return (
    <>
      <li onContextMenu={displayMenu} key={page.id}>
        <Link
          className={clsx(
            'icon-container !justify-start w-full !px-2 text-sm !py-0.5',
            page.id === +activePageId && 'bg-slate-100 bg-opacity-25',
            isMenuOpen && 'outline-none ring-2 ring-slate-400',
          )}
          to={`/page/${page.id}`}
        >
          <span className="w-full text-start flex group items-center justify-between">
            <span>{page.title}</span>
            <Confirm
              onClick={handleDeletePage}
              content="Are you sure, you want to delete this page?"
              popoverButton={
                <Popover.Button className="icon-container group !px-1 !py-0 !bg-inherit hover:text-red-500 focus:text-red-500">
                  <RiDeleteBin5Line className="invisible group-hover:visible group-focus:visible" />
                </Popover.Button>
              }
            />
          </span>
        </Link>
      </li>

      <Menu
        id={MENU_ID}
        theme="dark"
        onVisibilityChange={(isVisible) => {
          setIsMenuOpen(isVisible)
        }}
        className="my-menu-container"
      >
        <Link className="my-menu-item" to={`/page/${page.id}`}>
          <span className="flex gap-x-2 items-center">
            <AiOutlineRight className="transition-all duration-150" />
            <span>Open to the right</span>
          </span>
        </Link>
        <Link className="my-menu-item" to={`/page/rename/${page.id}`}>
          <span className="flex gap-x-2 items-center">
            <FiEdit3 />
            <span>Rename</span>
          </span>
        </Link>
        <Confirm
          onClick={handleDeletePage}
          content="Are you sure, you want to delete this page?"
          popoverButton={
            <Popover.Button className="my-menu-item hover:text-red-500 focus:text-red-500">
              <span className="flex gap-x-2 items-center">
                <RiDeleteBin5Line className="transition-all duration-150" />
                <span>Delete</span>
              </span>
            </Popover.Button>
          }
        />
      </Menu>
    </>
  )
}
