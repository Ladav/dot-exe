import { range } from 'radash'
import { MouseEvent, useCallback, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { toast } from 'react-hot-toast'
import { Item, Menu, Separator, useContextMenu } from 'react-contexify'
import { SortOrder } from '../../enums/sort-order.enum'
import usePersistedState from '../../hooks/use-persisted-state'
import { deletePageById, getPageList } from '../../queries/page.queries'
import { queryClient } from '../../constants/client'

export default function PageList() {
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
    onError: (error, vars, prev) => {
      queryClient.setQueryData(pageListQueryKey, prev)
    },
    onSuccess: () => {
      toast.success('page deleted')
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
  })

  function displayMenu(event: MouseEvent<HTMLLIElement>) {
    show({ event })
  }

  return (
    <>
      <li
        onContextMenu={displayMenu}
        key={page.id}
        className={clsx(
          'icon-container !justify-start w-full !px-2 text-sm !py-0.5',
          page.id === +activePageId && 'bg-slate-100 bg-opacity-25',
          isMenuOpen && 'ring-1 ring-slate-100',
        )}
      >
        <Link className="w-full text-start flex group items-center justify-between" to={`/page/${page.id}`}>
          <span>{page.title}</span>
          <RiDeleteBin5Line
            className="invisible group-hover:visible hover:text-red-500 transition-all duration-150"
            onClick={(event: MouseEvent<SVGElement>) => {
              event.preventDefault()
              event.stopPropagation()
              onDelete(page.id)
            }}
          />
        </Link>
      </li>

      <Menu
        id={MENU_ID}
        theme="dark"
        onVisibilityChange={(isVisible) => {
          setIsMenuOpen(isVisible)
        }}
        className="text-sm mt-1 bg-slate-800 outline-1 outline outline-slate-500 rounded-md w-[176px] shadow p-2"
      >
        <Item>Open to the right</Item>
        <Separator />
        <Item>Rename</Item>
        <Separator />
        <Item>Delete</Item>
      </Menu>
    </>
  )
}
