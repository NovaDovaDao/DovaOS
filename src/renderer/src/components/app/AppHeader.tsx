import AppLogo from './AppLogo'
import clsx from 'clsx'
import { ComponentProps } from 'react'

export default function AppHeader({ className, ...props }: ComponentProps<'header'>): JSX.Element {
  return (
    <header {...props} className={clsx('h-full flex flex-col', className)}>
      <div className="space-y-2 mb-4">
        <AppLogo />
      </div>
    </header>
  )
}
