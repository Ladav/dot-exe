import { Menu } from '@headlessui/react'
import React, { Fragment } from 'react'
import { BsCheck2 } from 'react-icons/bs'
import { SortOrder } from '../../../enums/sort-order.enum'
import usePersistedState from '../../../hooks/use-persisted-state'

export type SortOrderMenuProps = {
  trigger: React.ReactElement
}

export default function SortOrderMenu({ trigger }: SortOrderMenuProps) {
  const [sortOrder, setSortOrder] = usePersistedState<SortOrder>('sortOrder')

  return (
    <Menu as="div" className="relative">
      <Menu.Button as={Fragment}>{React.cloneElement(trigger)}</Menu.Button>
      <Menu.Items className="fixed text-sm flex-col flex bg-slate-800 z-10 outline-1 outline outline-slate-500 text-slate-50 rounded-md w-48 shadow p-2">
        <Menu.Item
          as="button"
          className="px-3 w-full py-1 text-left hover:bg-slate-700 rounded-sm flex items-center justify-between gap-2"
          onClick={() => {
            setSortOrder(SortOrder.FILE_A_TO_Z)
          }}
        >
          File name (A to Z) {sortOrder === SortOrder.FILE_A_TO_Z && <BsCheck2 className="text-lg" />}
        </Menu.Item>
        <Menu.Item
          as="button"
          className="px-3 w-full py-1 text-left hover:bg-slate-700 rounded-sm flex items-center justify-between gap-2"
          onClick={() => {
            setSortOrder(SortOrder.FILE_Z_TO_A)
          }}
        >
          File name (Z to A) {sortOrder === SortOrder.FILE_Z_TO_A && <BsCheck2 className="text-lg" />}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}
