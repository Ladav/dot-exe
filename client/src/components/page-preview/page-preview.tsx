import { debounce } from 'radash'
import { useCallback } from 'react'
import { useLoaderData, useNavigation } from 'react-router-dom'
import { updatePageById } from '../../queries/page.queries'
import { Page, UpdatePageDto } from '../../types/page.types'
import { MyEditor } from '../my-editor'
import { MyEditorProps } from '../my-editor/my-editor'

const debouncedUpdatePageById = debounce({ delay: 200 }, updatePageById)

export default function PagePreview() {
  const navigation = useNavigation()
  const pageData = useLoaderData() as Page
  const pageId = pageData.id

  const onChange: MyEditorProps['onUpdate'] = useCallback(
    ({ editor }) => {
      const updates: UpdatePageDto = {
        content: editor.getHTML(),
      }
      if (pageId) {
        debouncedUpdatePageById(pageId, updates)
      }
    },
    [pageId],
  )

  if (navigation.state === 'loading') {
    return <div className="w-full h-full flex items-center justify-center">Loading Content...</div>
  }

  if (pageData === undefined) {
    return null
  }
  return <MyEditor content={pageData.content} className="px-2 py-3 overflow-auto w-full h-full" onUpdate={onChange} />
}

PagePreview.PagePreviewPlaceholder = function PagePreviewPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-base">Select a file from the sidebar</p>
    </div>
  )
}
