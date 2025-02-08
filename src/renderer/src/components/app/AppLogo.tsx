import DovaLogo from '@renderer/assets/logo.svg?react'
import { ComponentProps } from 'react'

export default function AppLogo(props: ComponentProps<'span'>): JSX.Element {
  return (
    <span {...props}>
      <DovaLogo width={100} height={24} />
      <span className="sr-only">Dova</span>
    </span>
  )
}
