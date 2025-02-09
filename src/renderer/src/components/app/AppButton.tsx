import { Button, ButtonProps } from '@headlessui/react'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'

export default function AppButton({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>): JSX.Element {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

      <Button
        {...props}
        className={clsx(
          'relative flex items-center gap-2 rounded-lg bg-black/40 backdrop-blur-sm',
          'py-2 px-4 text-sm font-medium text-white shadow-lg',
          'transition-all duration-300 ease-out',
          'hover:bg-black/60 hover:scale-105 hover:shadow-pink-500/20',
          'focus:outline-none focus:ring-2 focus:ring-pink-500/40',
          'group',
          className
        )}
      >
        {children}
      </Button>
    </div>
  )
}
