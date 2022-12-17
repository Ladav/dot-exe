import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import React, { Fragment } from 'react'
import { BsCheck2 } from 'react-icons/bs'

type MenuItem = {
  id: any
  label: string
  onClick?: () => void
  isDivider?: true
  className?: string
}

export type MyMenuProps = {
  trigger: React.ReactElement
  items: MenuItem[]
  activeId: MenuItem['id']
}

export default function MyMenu({ trigger, items, activeId }: MyMenuProps) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button as={Fragment}>{React.cloneElement(trigger)}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="fixed text-sm flex-col flex bg-slate-800 z-10 outline-1 outline outline-slate-500 text-slate-50 rounded-md min-w-48 shadow p-2">
          {items.map((item) => {
            if (item.isDivider) {
              return <DividerItem key={item.id} item={item} />
            }
            return <MenuItem key={item.id} item={item} activeId={activeId} />
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

function DividerItem({ item }: { item: MenuItem }) {
  return (
    <Menu.Item
      key={item.id}
      as={typeof item.onClick === 'function' ? 'button' : 'span'}
      className={clsx('w-full text-xs text-slate-400 flex items-center justify-between gap-1', item.className)}
      onClick={item.onClick}
    >
      {item.label}
      <div className="border-t my-1  border-slate-500 w-full" />
    </Menu.Item>
  )
}

function MenuItem({ item, activeId }: { item: MenuItem; activeId: MyMenuProps['activeId'] }) {
  return (
    <Menu.Item
      key={item.id}
      as="button"
      className={clsx(
        'px-3 w-full py-1 text-left hover:bg-slate-700 rounded-sm flex items-center justify-between gap-2',
        item.className,
      )}
      onClick={item.onClick}
    >
      {item.label}
      {item.id === activeId && <BsCheck2 className="text-lg" />}
    </Menu.Item>
  )
}
