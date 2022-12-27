import { BsSortDownAlt } from 'react-icons/bs'
import { FiFolderPlus } from 'react-icons/fi'
import { TbEdit } from 'react-icons/tb'
import clsx from 'clsx'
import SortOrderMenu from './components/sort-order-menu'
import { Link } from 'react-router-dom'

export type QuickAccessMenuProps = {
  className?: string
}

export default function QuickAccessMenu({ className }: QuickAccessMenuProps) {
  return (
    <ul className={clsx('text-lg px-2 my-3 flex items-center gap-x-1 w-full justify-center', className)}>
      <li>
        <Link className="icon-container" to="/page/create/new">
          <TbEdit />
        </Link>
      </li>
      <li>
        <button className="icon-container">
          <FiFolderPlus />
        </button>
      </li>
      <li>
        <SortOrderMenu
          trigger={
            <button className="icon-container">
              <BsSortDownAlt />
            </button>
          }
        />
      </li>
    </ul>
  )
}
