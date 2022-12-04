import { useEffect, useState } from 'react'
import { getAllPages } from '../../queries/page.queries'
import { Page } from '../../types/page.types'

export type PageListProps = {
  onPageSelect: (page: Pick<Page, 'id'>) => void
}

export default function PageList({ onPageSelect }: PageListProps) {
  const [pages, setPages] = useState<Page[]>()
  useEffect(() => {
    getAllPages().then((data) => setPages(data))
  }, [])

  return (
    <ul className="mt-2 w-full">
      {Array.isArray(pages) ? (
        <>
          {pages.map((page) => (
            <li key={page.id} className="icon-container !justify-start w-full !px-2 text-sm !py-0.5">
              <button
                className="w-full text-start"
                onClick={() => {
                  onPageSelect(page)
                }}
              >
                {page.title}
              </button>
            </li>
          ))}
        </>
      ) : (
        <li className="icon-container !justify-start !px-2 text-sm !py-0.5">Loading...</li>
      )}
    </ul>
  )
}
