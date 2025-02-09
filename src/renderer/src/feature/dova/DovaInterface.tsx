import { ComponentProps } from 'react'
import ChatInput from '@renderer/components/chat/ChatInput'
import GlowingLogo from '@renderer/components/app/GlowingLogo'
import DovaResponse from './DovaResponse'
import { useDovaSendMessage } from './useDova'

export default function DovaInterface(props: ComponentProps<'section'>): JSX.Element {
  const { sendMessage, isPending } = useDovaSendMessage()
  const handleMessage = (message: string): void => {
    sendMessage({ content: message })
  }

  return (
    <section
      {...props}
      className="flex flex-col h-full justify-center items-center max-w-xl mx-auto gap-4"
    >
      <GlowingLogo />
      <DovaResponse />
      <ChatInput isLoading={isPending} onSubmit={handleMessage} />
    </section>
  )
}
