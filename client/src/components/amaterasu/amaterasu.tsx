import clsx from 'clsx'

type AmaterasuProps = {
  className?: string
}

export default function Amaterasu({ className }: AmaterasuProps) {
  return (
    <div className={clsx('amaterasu-fire', className)}>
      <div className="amaterasu-fire-left">
        <div className="amaterasu-fire-main"></div>
        <div className="amaterasu-fire-particle"></div>
      </div>
      <div className="amaterasu-fire-top">
        <div className="amaterasu-fire-main"></div>
        <div className="amaterasu-fire-particle"></div>
      </div>
      <div className="amaterasu-fire-right">
        <div className="amaterasu-fire-main"></div>
        <div className="amaterasu-fire-particle"></div>
      </div>
      <div className="amaterasu-fire-bottom">
        <div className="amaterasu-fire-main"></div>
      </div>
    </div>
  )
}
