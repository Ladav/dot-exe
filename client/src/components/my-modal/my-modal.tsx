import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export interface RenamePageProps {
  visible: boolean
  triggerClose: () => void
  children: React.ReactNode
  title: string
}

export default function MyModal({ title, visible, children, triggerClose }: RenamePageProps) {
  return (
    <>
      <Transition appear show={visible} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10" open={visible} onClose={triggerClose}>
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
                    <Dialog.Title>{title}</Dialog.Title>
                    {children}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
