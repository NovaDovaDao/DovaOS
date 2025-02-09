import { ComponentProps } from 'react'
import ChatInput from '@renderer/components/chat/ChatInput'
import GlowingLogo from '@renderer/components/app/GlowingLogo'
import AgentList from '../agents/AgentsList'
import { useSendMessage } from '../chat/useChat'
import { useAppStore } from '@renderer/stores/app'

export default function DovaInterface(props: ComponentProps<'section'>): JSX.Element {
  const { setAgentId } = useAppStore()
  const { mutateAsync, isPending } = useSendMessage('dova')
  const handleSendMessage = async (message: string): Promise<void> => {
    await mutateAsync({ content: message })
    setAgentId('dova')
  }

  return (
    <section
      {...props}
      className="flex flex-col h-full justify-center items-center max-w-xl mx-auto gap-4"
    >
      <GlowingLogo />
      <ChatInput isLoading={isPending} onSendMessage={handleSendMessage} />
      <AgentList />
    </section>
  )
}
