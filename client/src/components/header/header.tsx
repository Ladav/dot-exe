import { BsFolder, BsSearch, BsStar } from 'react-icons/bs'
import { APP_NAME } from '../../constants/constant'

export default function Header() {
  return (
    <header className="bg-slate-600 h-[45px] text-base py-1 px-2 flex items-center">
      <ul className="text-lg flex items-center gap-x-1 w-full">
        <li>
          <button className="icon-container">
            <BsFolder />
          </button>
        </li>
        <li>
          <button className="icon-container">
            <BsSearch />
          </button>
        </li>
        <li>
          <button className="icon-container">
            <BsStar />
          </button>
        </li>
        <li className="w-full text-center">{APP_NAME}</li>
      </ul>
    </header>
  )
}
