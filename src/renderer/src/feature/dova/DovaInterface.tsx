import { ComponentProps } from 'react'
import ChatInput from '@renderer/components/chat/ChatInput'
import GlowingLogo from '@renderer/components/app/GlowingLogo'
import AgentList from '../agents/AgentsList'
import { useSendMessage } from '../chat/useChat'

export default function DovaInterface(props: ComponentProps<'section'>): JSX.Element {
  const { sendMessage, isPending } = useSendMessage('dova')
  const handleMessage = (message: string): void => {
    sendMessage({ content: message })
  }

  return (
    <section
      {...props}
      className="flex flex-col h-full justify-center items-center max-w-xl mx-auto gap-4"
    >
      <GlowingLogo />
      <ChatInput isLoading={isPending} onSubmit={handleMessage} />
      <AgentList />
    </section>
  )
}
