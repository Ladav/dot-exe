import { debounce } from 'radash'
import { useMemo } from 'react'
import { useMutation } from 'react-query'
import { useLoaderData, useNavigation } from 'react-router-dom'
import { updateFile } from '../../queries/file.queries'
import { GDriveFile, UpdateFileDto } from '../../types/file.types'
import { MyEditor } from '../my-editor'
import { MyEditorProps } from '../my-editor/my-editor'

export default function PagePreview() {
  const navigation = useNavigation()
  const pageData = useLoaderData() as GDriveFile
  const pageId = pageData.id
  const updatePageMutationKey = ['update-page', pageId]
  const updatePageM = useMutation(updatePageMutationKey, updateFile)

  const onChange: MyEditorProps['onUpdate'] = useMemo(
    () =>
      debounce({ delay: 200 }, function updatePageContent({ editor }) {
        const dto: UpdateFileDto = {
          fileId: pageId,
          content: editor.getHTML(),
        }
        updatePageM.mutate(dto)
      }),
    [pageId, updatePageM],
  )

  if (navigation.state === 'loading') {
    return <div className="w-full h-full flex items-center justify-center">Loading Content...</div>
  }

  return (
    <div className="px-2 py-3 overflow-auto w-full h-full">
      <div className="text-lg text-right mx-auto max-w-4xl px-4 text-slate-500">{pageData.name}</div>
      <MyEditor content={pageData.content} onUpdate={onChange} />
    </div>
  )
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
