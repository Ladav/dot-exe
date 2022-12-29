import { BsFolder, BsSearch, BsStar } from 'react-icons/bs'
import { APP_NAME } from '../../constants/constant'
import { ComingSoonFeature } from '../coming-soon'

export default function Header() {
  return (
    <header className="bg-slate-600 h-[45px] text-base py-1 px-2 flex items-center">
      <ul className="text-lg flex items-center gap-x-1 w-full">
        <li>
          <ComingSoonFeature>
            <button className="icon-container">
              <BsFolder />
            </button>
          </ComingSoonFeature>
        </li>
        <li>
          <ComingSoonFeature>
            <button className="icon-container">
              <BsSearch />
            </button>
          </ComingSoonFeature>
        </li>
        <li>
          <ComingSoonFeature>
            <button className="icon-container">
              <BsStar />
            </button>
          </ComingSoonFeature>
        </li>
        <li className="ml-auto text-center">{APP_NAME}</li>
      </ul>
    </header>
  )
}
