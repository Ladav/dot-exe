import { Menu } from '@headlessui/react'
import React, { Fragment } from 'react'

export type SortOrderMenuProps = {
  trigger: React.ReactElement
}

export default function SortOrderMenu({ trigger }: SortOrderMenuProps) {
  return (
    <>
      <Menu as="div" className="relative">
        <Menu.Button as={Fragment}>{React.cloneElement(trigger)}</Menu.Button>
        <Menu.Items className="fixed text-sm flex-col flex bg-slate-800 z-10 outline-1 outline outline-slate-500 text-slate-50 rounded-md w-48 shadow p-2">
          <Menu.Item
            as="button"
            className="px-3 w-full py-1 text-left hover:bg-slate-700 rounded-sm"
            onClick={() => {}}
          >
            File name (A to Z)
          </Menu.Item>
          <Menu.Item as="button" className="px-3 w-full py-1 text-left hover:bg-slate-700 rounded-sm">
            File name (Z to A)
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </>
  )
}
