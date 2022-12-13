import React, { useCallback, useState } from 'react'
import { useMutation } from 'react-query'
import { Dialog } from '@headlessui/react'
import { createPage } from '../../queries/page.queries'

export interface CreatePageProps {
  trigger: React.ReactElement
}

export default function CreatePage({ trigger }: CreatePageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [titleInput, setTitleInput] = useState('')
  const createPageM = useMutation(createPage, {
    onSuccess: () => {
      setIsOpen(false)
    },
  })

  const onCreate = useCallback(
    (title: string) => {
      createPageM.mutate({ content: '', title })
      setTitleInput('')
    },
    [createPageM],
  )

  return (
    <>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 bg-white bg-opacity-10"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="flex w-full h-full items-center justify-center">
          <Dialog.Panel className="bg-slate-800 text-slate-50 rounded-md w-72 p-4 shadow space-y-4">
            <Dialog.Title>Create Page</Dialog.Title>

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

            <button
              type="button"
              className="primary-btn mr-4"
              disabled={createPageM.isLoading}
              onClick={() => onCreate(titleInput)}
            >
              Create
            </button>

            <button
              type="button"
              className="secondary-btn"
              disabled={createPageM.isLoading}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
      {React.cloneElement(trigger, {
        onClick: () => {
          setIsOpen(true)
        },
      })}
    </>
  )
}
