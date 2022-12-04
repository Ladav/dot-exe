import { debounce } from 'radash'
import { useCallback, useEffect, useState } from 'react'
import { getPageById, updatePageById } from '../../queries/page.queries'
import { Page, UpdatePageDto } from '../../types/page.types'
import { MyEditor } from '../my-editor'
import { MyEditorProps } from '../my-editor/my-editor'

export type PagePreviewProps = {
  pageId: Page['id']
}
const debouncedUpdatePageById = debounce({ delay: 200 }, updatePageById)

export default function PagePreview({ pageId }: PagePreviewProps) {
  const [pageData, setPageData] = useState<Page>()

  useEffect(() => {
    getPageById(pageId).then((data) => setPageData(data))
  }, [pageId])

  const onChange: MyEditorProps['onUpdate'] = useCallback(
    ({ editor }) => {
      const updates: UpdatePageDto = {
        content: editor.getHTML(),
      }

      debouncedUpdatePageById(pageId, updates)
    },
    [pageId],
  )

  if (pageData === undefined) {
    return null
  }

  return <MyEditor content={pageData.content} className="px-2 py-3 overflow-auto w-full h-full" onUpdate={onChange} />
}
