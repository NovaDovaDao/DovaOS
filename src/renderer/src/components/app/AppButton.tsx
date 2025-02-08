import { Button, ButtonProps } from '@headlessui/react'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'

export default function AppButton({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>): JSX.Element {
  return (
    <Button
      {...props}
      className={clsx('flex items-center gap-2 text-sm h-8 min-w-24 rounded px-4', className)}
    >
      {children}
    </Button>
  )
}
