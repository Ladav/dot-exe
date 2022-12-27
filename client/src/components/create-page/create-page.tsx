import React, { Fragment, useCallback, useState } from 'react'
import { useMutation } from 'react-query'
import { Dialog, Transition } from '@headlessui/react'
import { createPage } from '../../queries/page.queries'
import { queryClient } from '../../constants/client'
import clsx from 'clsx'
import { Button } from '../button'

export interface CreatePageProps {
  trigger: React.ReactElement
}

export default function CreatePage({ trigger }: CreatePageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [titleInput, setTitleInput] = useState('')
  const createPageM = useMutation(createPage, {
    onSuccess: () => {
      setTitleInput('')
      setIsOpen(false)
      queryClient.invalidateQueries(['page-list'])
    },
  })

  const onCreate = useCallback(
    (title: string) => {
      createPageM.mutate({ content: '', title })
    },
    [createPageM],
  )

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10" open={isOpen} onClose={() => setIsOpen(false)}>
          <div className="flex w-full h-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0">
              <div className="min-h-full w-full flex items-center justify-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
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
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </Button>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
      {React.cloneElement(trigger, {
        onClick: () => {
          setIsOpen(true)
        },
      })}
    </>
  )
}
