import { type DetailedHTMLProps, type ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'
import { TbLoader } from 'react-icons/tb'

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  isLoading?: boolean
}

export default function Button({ isLoading, children, disabled, ...rest }: ButtonProps) {
  return (
    <button disabled={isLoading || disabled} {...rest}>
      <TbLoader className={clsx('animate-spin h-full text-slate-50 my-auto', isLoading ? '' : 'hidden')} />
      <span className={clsx(isLoading && 'ml-2')}>{children}</span>
    </button>
  )
}
