import { debounce } from 'radash'
import { useMemo } from 'react'
import { useMutation } from 'react-query'
import { useLoaderData, useNavigation } from 'react-router-dom'
import { updatePageById } from '../../queries/page.queries'
import { Page, UpdatePageDto } from '../../types/page.types'
import { MyEditor } from '../my-editor'
import { MyEditorProps } from '../my-editor/my-editor'

export default function PagePreview() {
  const navigation = useNavigation()
  const pageData = useLoaderData() as Page
  const updatePageM = useMutation(updatePageById)
  const pageId = pageData.id

  const onChange: MyEditorProps['onUpdate'] = useMemo(
    () =>
      debounce({ delay: 200 }, function updatePageContent({ editor }) {
        const dto: UpdatePageDto = {
          content: editor.getHTML(),
        }
        if (pageId) {
          updatePageM.mutate({ id: pageId, dto })
        }
      }),
    [pageId, updatePageM],
  )

  if (navigation.state === 'loading') {
    return <div className="w-full h-full flex items-center justify-center">Loading Content...</div>
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

PagePreview.ErrorElement = function PagePreviewErrorElement() {
  return (
    <div className="p-4">
      <pre>Failed to fetch page, try refreshing the browser!</pre>
    </div>
  )
}
