import { CreatePage } from './components/create-page'
import { BiMessageSquareEdit } from 'react-icons/bi'
import { BsFiles, BsFolder, BsSearch, BsStar, BsSortDownAlt } from 'react-icons/bs'
import { IoSettingsOutline } from 'react-icons/io5'
import { TbEdit } from 'react-icons/tb'
import { FiFolderPlus } from 'react-icons/fi'
import { APP_NAME, HOME_NAME } from './constants/constant'
import { useState } from 'react'
import { PageList } from './components/page-list'
import { PagePreview } from './components/page-preview'
import type { Page } from './types/page.types'

function App() {
  const [pageOpened, setPageOpened] = useState<Page['id']>()

  return (
    <div className="w-full h-full bg-slate-800 text-slate-300 flex flex-col">
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
      <div className="w-full flex-1 flex overflow-hidden">
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
              <PageList
                onPageSelect={({ id }) => {
                  setPageOpened(id)
                }}
              />
            </div>
          </div>
        </div>
        <main className="w-full h-full py-2">
          {pageOpened ? (
            <PagePreview pageId={pageOpened} />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-base">Select a file from the sidebar</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
