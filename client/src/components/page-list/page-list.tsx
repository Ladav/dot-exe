import { range } from 'radash'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getAllPages } from '../../queries/page.queries'

export default function PageList() {
  const pagesQ = useQuery(['pages'], getAllPages)

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
