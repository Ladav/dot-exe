import { debounce } from 'radash'
import { useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { queryClient } from '../../constants/client'
import { getFileContentById, updateFile } from '../../queries/file.queries'
import { GDriveFile, UpdateFileDto } from '../../types/file.types'
import { MyEditor } from '../my-editor'
import { MyEditorProps } from '../my-editor/my-editor'

export default function PagePreview() {
  const { pageId } = useParams() as { pageId: string }
  const pageDataQueryKey = ['page', pageId]

  const pageDataQ = useQuery(pageDataQueryKey, ({ queryKey }) => {
    const [, id] = queryKey
    return getFileContentById(id)
  })
  const updatePageM = useMutation(updateFile, {
    onMutate: ({ content }) => {
      const currentData = queryClient.getQueryData<GDriveFile>(pageDataQueryKey)
      if (currentData) {
        queryClient.setQueryData(pageDataQueryKey, { ...currentData, content })
      }
      return () => queryClient.setQueryData(pageDataQueryKey, currentData)
    },
    onError: (error, vars, undo) => {
      undo?.()
    },
    onSuccess: () => {
      toast.success('content saved')
    },
  })

  const debouncedUpdatePageM: MyEditorProps['onBlur'] = useMemo(
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

  const updateContentOnServer: MyEditorProps['onBlur'] = (...props) => {
    return debouncedUpdatePageM(...props)
  }

  if (pageDataQ.isLoading) {
    return <div className="w-full h-full flex items-center justify-center">Loading Content...</div>
  }

  if (pageDataQ.error) {
    return <PagePreviewErrorElement />
  }

  if (pageDataQ.data) {
    const { id, name, content } = pageDataQ.data
    return (
      <div className="px-2 py-3 overflow-auto w-full h-full" key={id}>
        <div className="text-lg text-right mx-auto max-w-4xl px-4 text-slate-500">{name}</div>
        <MyEditor content={content} onBlur={(...props) => updateContentOnServer(...props)} />
      </div>
    )
  }

  return null
}

PagePreview.PagePreviewPlaceholder = function PagePreviewPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-base">Select a file from the sidebar</p>
    </div>
  )
}

function PagePreviewErrorElement() {
  return (
    <div className="p-4">
      <pre>Failed to fetch page, try refreshing the browser!</pre>
    </div>
  )
}
