import { BiMessageSquareEdit } from 'react-icons/bi'
import { BsFiles } from 'react-icons/bs'
import { IoSettingsOutline } from 'react-icons/io5'
import { HOME_NAME } from '../../constants/constant'
import { ComingSoonFeature } from '../coming-soon'
import { PageList } from '../page-list'
import { QuickAccessMenu } from '../quick-access-menu'

export default function NavBar() {
  return (
    <div className="h-full flex bg-slate-700 text-base border-r border-gray-600">
      <nav className="w-[45px] h-full py-3 px-2 border-r border-gray-600">
        <ul className="text-lg flex flex-col items-center gap-y-2 h-full w-full">
          <li>
            <ComingSoonFeature>
              <button className="icon-container">
                <BiMessageSquareEdit />
              </button>
            </ComingSoonFeature>
          </li>
          <li>
            <ComingSoonFeature>
              <button className="icon-container">
                <BsFiles />
              </button>
            </ComingSoonFeature>
          </li>
          <li className="mt-auto">
            <ComingSoonFeature>
              <button className="icon-container">
                <IoSettingsOutline />
              </button>
            </ComingSoonFeature>
          </li>
        </ul>
      </nav>
      <div className="w-80 overflow-hidden flex flex-col">
        <QuickAccessMenu className="mb-4" />

        <div className="w-full px-4 my-3 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="font-medium">{HOME_NAME}</div>
          <PageList />
        </div>
      </div>
    </div>
  )
}
