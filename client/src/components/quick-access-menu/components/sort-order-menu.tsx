import { useMemo } from 'react'
import { SortOrder } from '../../../enums/sort-order.enum'
import usePersistedState from '../../../hooks/use-persisted-state'
import { getEntries } from '../../../utils/object.utils'
import MyMenu, { MyMenuProps } from '../../my-menu/my-menu'

export type SortOrderMenuProps = {
  trigger: MyMenuProps['trigger']
}

const sortOrderLabelMap: Record<SortOrder | string, Omit<MyMenuProps['items'][0], 'id'>> = {
  FILE_A_TO_Z: { label: 'File name (A to Z)' },
  FILE_Z_TO_A: { label: 'File name (Z to A)' },
  divider_1: { label: '', isDivider: true },
  MODIFIED_NEW_TO_OLD: { label: 'Modified time (new to old)' },
  MODIFIED_OLD_TO_NEW: { label: 'Modified time (old to new)' },
  divider_2: { label: '', isDivider: true },
  CREATED_NEW_TO_OLD: { label: 'Created time (new to old)' },
  CREATED_OLD_TO_NEW: { label: 'Created time (old to new)' },
}

export default function SortOrderMenu({ trigger }: SortOrderMenuProps) {
  const [sortOrder, setSortOrder] = usePersistedState<SortOrder>('sortOrder')

  const menuItems = useMemo((): MyMenuProps['items'] => {
    return getEntries(sortOrderLabelMap).map(([id, props]) => {
      return {
        id,
        onClick: SortOrder[id as SortOrder] ? () => setSortOrder(id as SortOrder) : undefined,
        ...props,
      }
    })
  }, [setSortOrder])

  return <MyMenu trigger={trigger} items={menuItems} activeId={sortOrder} />
}
