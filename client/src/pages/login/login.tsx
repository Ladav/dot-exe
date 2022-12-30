import { Amaterasu } from '../../components/amaterasu'
import { Button } from '../../components/button'

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span className="text-5xl mt-4 text-slate-500 font-bold">Ex-Fox</span>
      <Amaterasu />
      <Button className="primary-btn z-10 mt-36">Sign In with Google</Button>
    </div>
  )
}
