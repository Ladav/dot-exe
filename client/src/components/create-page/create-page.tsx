import { useCallback, useState } from 'react'
import { useMutation } from 'react-query'
import { queryClient } from '../../constants/client'
import clsx from 'clsx'
import { Button } from '../button'
import { MyModal } from '../my-modal'
import { useNavigate } from 'react-router-dom'
import { createFile, getFiles } from '../../queries/file.queries'
import { toast } from 'react-hot-toast'
import { PAGE_LIST } from '../../constants/constant'

export default function CreatePage() {
  const [isOpen, setIsOpen] = useState(true)
  const [titleInput, setTitleInput] = useState('')
  const navigate = useNavigate()

  const handleModalClose = useCallback(
    (pageId?: string) => {
      setIsOpen(false)
      if (pageId) {
        navigate(`/page/${pageId}`)
      } else {
        navigate(-1)
      }
    },
    [navigate],
  )

  const createPageM = useMutation(createFile, {
    onSuccess: (page) => {
      queryClient.setQueryData<Awaited<ReturnType<typeof getFiles>>>(PAGE_LIST, (prev) => [page, ...(prev || [])])
      handleModalClose(page.id)
      toast.success('page created')
    },
  })

  const onCreate = useCallback(
    (title: string) => {
      createPageM.mutate({ content: '', title })
    },
    [createPageM],
  )

  return (
    <MyModal title="Create Page" visible={isOpen} triggerClose={handleModalClose}>
      <input
        type="text"
        placeholder="Enter the page title"
        className="w-full focus:outline-none rounded px-3 py-1.5 bg-slate-500 placeholder-slate-200"
        maxLength={256}
        value={titleInput}
        onChange={(event) => {
          event.preventDefault()
          setTitleInput(event.target.value)
        }}
      />

      <Button
        className={clsx(
          'primary-btn mr-4 translate transition-all duration-150',
          createPageM.isLoading && 'hover:cursor-none',
        )}
        isLoading={createPageM.isLoading}
        onClick={() => onCreate(titleInput)}
      >
        <span className={clsx(createPageM.isLoading && 'ml-2')}>Create</span>
      </Button>

      <Button
        className={clsx('primary-btn', createPageM.isLoading && 'hover:cursor-none')}
        disabled={createPageM.isLoading}
        onClick={() => handleModalClose()}
      >
        Cancel
      </Button>
    </MyModal>
  )
}
