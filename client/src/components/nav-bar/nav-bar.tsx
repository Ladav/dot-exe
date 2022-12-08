import { BiMessageSquareEdit } from 'react-icons/bi'
import { BsFiles, BsSortDownAlt } from 'react-icons/bs'
import { FiFolderPlus } from 'react-icons/fi'
import { IoSettingsOutline } from 'react-icons/io5'
import { TbEdit } from 'react-icons/tb'
import { HOME_NAME } from '../../constants/constant'
import { CreatePage } from '../create-page'
import { PageList } from '../page-list'

export default function NavBar() {
  return (
    <div className="h-full flex bg-slate-700 text-base border-r border-gray-600">
      <nav className="w-[45px] h-full py-3 px-2 border-r border-gray-600">
        <ul className="text-lg flex flex-col items-center gap-y-2 h-full w-full">
          <li>
            <button className="icon-container">
              <BiMessageSquareEdit />
            </button>
          </li>
          <li>
            <button className="icon-container">
              <BsFiles />
            </button>
          </li>
          <li className="mt-auto">
            <button className="icon-container">
              <IoSettingsOutline />
            </button>
          </li>
        </ul>
      </nav>
      <div className="w-80 overflow-hidden flex flex-col">
        <ul className="text-lg mb-4 px-2 my-3 flex items-center gap-x-1 w-full justify-center">
          <li>
            <CreatePage
              trigger={
                <button className="icon-container">
                  <TbEdit />
                </button>
              }
            />
          </li>
          <li>
            <button className="icon-container">
              <FiFolderPlus />
            </button>
          </li>
          <li>
            <button className="icon-container">
              <BsSortDownAlt />
            </button>
          </li>
        </ul>
        <div className="w-full px-4 my-3 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="font-medium">{HOME_NAME}</div>
          <PageList />
        </div>
      </div>
    </div>
  )
}
