import { useMemo } from 'react'
import { SortOrder } from '../../../enums/sort-order.enum'
import usePersistedState from '../../../hooks/use-persisted-state'
import MyMenu, { MyMenuProps } from '../../my-menu/my-menu'

export type SortOrderMenuProps = {
  trigger: MyMenuProps['trigger']
}

export default function SortOrderMenu({ trigger }: SortOrderMenuProps) {
  const [sortOrder, setSortOrder] = usePersistedState<SortOrder>('sortOrder')

  const menuItems = useMemo((): MyMenuProps['items'] => {
    return [
      {
        id: SortOrder.FILE_A_TO_Z,
        label: 'File name (A to Z)',
        onClick: () => setSortOrder(SortOrder.FILE_A_TO_Z),
      },
      {
        id: SortOrder.FILE_Z_TO_A,
        label: 'File name (Z to A)',
        onClick: () => setSortOrder(SortOrder.FILE_Z_TO_A),
      },
    ]
  }, [setSortOrder])

  return <MyMenu trigger={trigger} items={menuItems} activeId={sortOrder} />
}
