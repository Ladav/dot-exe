import { useEffect, useState } from 'react'
import { getPageById } from '../../queries/page.queries'
import { Page } from '../../types/page.types'
import { Editor } from '../editor'

export type PagePreviewProps = {
  pageId: Page['id']
}

export default function PagePreview({ pageId: id }: PagePreviewProps) {
  const [pageData, setPageData] = useState<Page>()

  useEffect(() => {
    getPageById(id).then((data) => setPageData(data))
  }, [id])

  if (pageData === undefined) {
    return null
  }

  return <Editor content={pageData.content} className="px-2 py-3 overflow-auto w-full h-full" />
}
