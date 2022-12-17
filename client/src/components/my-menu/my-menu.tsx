import { Menu } from '@headlessui/react'
import React, { Fragment } from 'react'
import { BsCheck2 } from 'react-icons/bs'

export type MyMenuProps = {
  trigger: React.ReactElement
  items: {
    id: any
    label: string
    onClick?: () => void
  }[]
  activeId: MyMenuProps['items']['0']['id']
}

export default function MyMenu({ trigger, items, activeId }: MyMenuProps) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button as={Fragment}>{React.cloneElement(trigger)}</Menu.Button>
      <Menu.Items className="fixed text-sm flex-col flex bg-slate-800 z-10 outline-1 outline outline-slate-500 text-slate-50 rounded-md w-48 shadow p-2">
        {items.map((item) => (
          <Menu.Item
            as="button"
            key={item.id}
            className="px-3 w-full py-1 text-left hover:bg-slate-700 rounded-sm flex items-center justify-between gap-2"
            onClick={item.onClick}
          >
            {item.label}
            {item.id === activeId && <BsCheck2 className="text-lg" />}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}
