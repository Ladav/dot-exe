import { useEffect, useState } from 'react'
import { getAllPages } from '../../queries/page.queries'
import { Page } from '../../types/page.types'

export default function PageList() {
  const [pages, setPages] = useState<Page[]>()
  useEffect(() => {
    getAllPages().then((data) => setPages(data))
  }, [])

  return (
    <ul className="mt-2 w-full">
      {Array.isArray(pages) ? (
        <>
          {pages.map((page) => (
            <li key={page.id} className="icon-container !justify-start !px-2 text-sm !py-0.5">
              <a href="/">{page.title}</a>
            </li>
          ))}
        </>
      ) : (
        <li className="icon-container !justify-start !px-2 text-sm !py-0.5">Loading...</li>
      )}
    </ul>
  )
}
