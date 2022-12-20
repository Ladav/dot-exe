import { range } from 'radash'
import { MouseEvent, useCallback, useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { SortOrder } from '../../enums/sort-order.enum'
import usePersistedState from '../../hooks/use-persisted-state'
import { deletePageById, getPageList } from '../../queries/page.queries'
import { toast } from 'react-hot-toast'
import { queryClient } from '../../constants/client'
import clsx from 'clsx'

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
            <li
              key={page.id}
              className={clsx(
                'icon-container !justify-start w-full !px-2 text-sm !py-0.5',
                page.id === +pageId && 'bg-slate-100 bg-opacity-25',
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
          ))
        }

        return null
      }, [onDelete, pagesQ.data, pagesQ.status])}
    </ul>
  )
}
