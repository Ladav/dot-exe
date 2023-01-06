import { useCallback, useState } from 'react'
import { useMutation } from 'react-query'
import { queryClient } from '../../constants/client'
import clsx from 'clsx'
import { Button } from '../button'
import { useNavigate, useParams } from 'react-router-dom'
import { MyModal } from '../my-modal'
import { renameFile } from '../../queries/file.queries'

export default function RenamePage() {
  const [isOpen, setIsOpen] = useState(true)
  const [titleInput, setTitleInput] = useState('')
  const navigate = useNavigate()
  const { pageId } = useParams<{ pageId: string }>()

  const handleModalClose = useCallback(() => {
    setIsOpen(false)
    navigate(-1)
  }, [navigate])

  const { isLoading, mutate } = useMutation(renameFile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['page-list'])
      handleModalClose()
    },
  })

  const onCreate = useCallback(
    (title: string) => {
      if (pageId) {
        mutate({ fileId: pageId, name: title })
      }
    },
    [mutate, pageId],
  )

  return (
    <MyModal title="Rename Page" visible={isOpen} triggerClose={handleModalClose}>
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
        className={clsx('primary-btn mr-4 translate transition-all duration-150', isLoading && 'hover:cursor-none')}
        isLoading={isLoading}
        onClick={() => onCreate(titleInput)}
      >
        <span className={clsx(isLoading && 'ml-2')}>Rename</span>
      </Button>

      <Button
        className={clsx('primary-btn', isLoading && 'hover:cursor-none')}
        disabled={isLoading}
        onClick={handleModalClose}
      >
        Cancel
      </Button>
    </MyModal>
  )
}
