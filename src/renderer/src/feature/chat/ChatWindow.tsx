// src/renderer/src/feature/chat/ChatWindow.tsx
import { useEffect, useRef } from 'react'
import { formatDistanceToNow } from 'date-fns'
import Markdown from 'markdown-to-jsx'
import { useAppStore } from '@renderer/stores/app'
import { useChat, useSendMessage } from './useChat'
import AppAlert from '@renderer/components/app/AppAlert'
import ChatInput from '@renderer/components/chat/ChatInput'
import AgentModal from '../agents/AgentModal'
// import AgentsDialog from '../agents/AgentsDialog'
import { Message } from '@renderer/api/ghosts-client'
import AppLogo from '@renderer/components/app/AppLogo'
import { useAgent } from '../agents/useAgents'

const ChatWindow = (): JSX.Element => {
  const { agentId, setAgentId } = useAppStore()
  const { agent } = useAgent(agentId)

  const { error, messages, isLoading } = useChat(agentId)
  const { sendMessage, isPending } = useSendMessage(agentId)

  const lastEl = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!isLoading && messages && lastEl.current) {
      lastEl.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isLoading, JSON.stringify(messages)])

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4 bg-black border-b border-neutral-800">
        <button onClick={() => setAgentId(null)}>
          <AppLogo />
        </button>
        <nav className="flex gap-4">
          {agentId !== 'dova' && <AgentModal characterConfig={agent?.character} />}
          {/* <AgentsDialog /> */}
        </nav>
      </header>
      <div className="flex-1 px-4 overflow-auto">
        {/* Messages Area */}
        {messages.length > 0 && (
          <div className="relative flex-1 overflow-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent mb-8">
            <div className="space-y-4">
              {messages.map((message, i) => (
                <article
                  key={message.timestamp}
                  className={`flex flex-col w-full relative group animate-slideIn ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <ChatMessage message={message} />
                  {messages.length - 1 > i && (
                    <hr className="border-white/10 w-16 mx-auto my-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                  )}
                </article>
              ))}
              <div ref={lastEl} />
            </div>
          </div>
        )}
      </div>

      {/* Error Alert */}
      {error && <AppAlert className="mb-4 mx-4">{error.message}</AppAlert>}

      {isPending && (
        <p className="px-4 text-xs">
          <span className="text-rose-300 animate-pulse">{agent?.character?.name ?? 'Agent'}</span>{' '}
          is responding...
        </p>
      )}

      {/* Chat Input */}
      <ChatInput
        className="p-4"
        isLoading={isPending}
        onSendMessage={(message) => sendMessage({ content: message })}
      />
    </div>
  )
}

const ChatMessage = ({ message }: { message: Message }): JSX.Element => (
  <div
    className={`max-w-[85%] sm:max-w-[75%] py-4 px-6 rounded-2xl transition-transform duration-300 ${
      message.role === 'user'
        ? 'ml-auto bg-pink-500/10 hover:bg-pink-500/20'
        : 'mr-auto bg-purple-500/10 hover:bg-purple-500/20'
    }`}
  >
    <header
      className={`mb-2 transition-all duration-300 opacity-0 group-hover:opacity-100 ${
        message.role === 'user' ? 'text-right' : ''
      }`}
    >
      <span className="text-xs text-white/40">
        {formatDistanceToNow(message.timestamp, { addSuffix: true })}
      </span>
    </header>

    <Markdown className="text-sm break-words prose prose-invert max-w-none">
      {String(message.content)}
    </Markdown>

    {message.configuration && (
      <Markdown className="text-sm break-words prose prose-invert max-w-none">
        {JSON.stringify(message.configuration, null, 2)}
      </Markdown>
    )}

    <footer className="mt-2">
      {message.role === 'agent' && (
        <span className="inline-block uppercase tracking-widest text-[10px] text-pink-400 animate-pulse">
          — Dova
        </span>
      )}
    </footer>
  </div>
)

export default ChatWindow
