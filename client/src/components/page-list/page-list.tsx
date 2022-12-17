import { range } from 'radash'
import { useMemo } from 'react'
import { QueryFunctionContext, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { SortOrder } from '../../enums/sort-order.enum'
import { getAllPages } from '../../queries/page.queries'

const defaultOptions: Parameters<typeof getAllPages>[0] = {
  sortOrder: SortOrder.FILE_A_TO_Z,
}

export default function PageList() {
  const pagesQ = useQuery(
    ['pages-list', defaultOptions],
    ({ queryKey }: QueryFunctionContext<[string, Parameters<typeof getAllPages>[0]]>) => {
      const [, params] = queryKey
      return getAllPages(params)
    },
  )

  return (
    <ul className="mt-2 w-full">
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
            <li key={page.id} className="icon-container !justify-start w-full !px-2 text-sm !py-0.5">
              <Link className="w-full text-start" to={`/page/${page.id}`}>
                {page.title}
              </Link>
            </li>
          ))
        }

        return null
      }, [pagesQ.data, pagesQ.status])}
    </ul>
  )
}
