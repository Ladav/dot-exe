import { Outlet } from 'react-router-dom'
import { Header } from '../../components/header'
import { NavBar } from '../../components/nav-bar'

export default function Home() {
  return (
    <div className="w-full h-full bg-slate-800 text-slate-300 flex flex-col">
      <Header />
      <div className="w-full flex-1 flex overflow-hidden">
        <NavBar />
        <main className="w-full h-full py-2">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
