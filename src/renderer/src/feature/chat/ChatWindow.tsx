// src/renderer/src/feature/chat/ChatWindow.tsx
import { useEffect, useMemo, useRef } from 'react'
import { formatDistanceToNow } from 'date-fns'
import Markdown from 'markdown-to-jsx'
import { useChat } from '@renderer/feature/chat/useChat'
import ChatInput from './ChatInput'
import AppAlert from '@renderer/components/app/AppAlert'
import { Message } from './chat.types'
// import AgentModal from "../agent/AgentModal";

const ChatWindow = (): JSX.Element => {
  const { error, messages, isLoading } = useChat()

  const chatLog = useMemo(() => {
    return messages.sort((a, b) => a.timestamp - b.timestamp)
  }, [messages])

  const lastEl = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!isLoading && messages && lastEl.current) {
      lastEl.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isLoading, messages])

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="w-full max-w-3xl px-4">
        {/* Messages area */}
        {messages.length > 0 && (
          <div className="relative flex-1 overflow-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent mb-8">
            <div className="space-y-4">
              {chatLog.map((message, i) => (
                <article
                  key={message.timestamp}
                  className={`flex flex-col w-full relative group animate-slideIn ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <ChatMessage message={message} />
                  {chatLog.length - 1 > i && (
                    <hr className="border-white/10 w-16 mx-auto my-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                  )}
                </article>
              ))}
              <div ref={lastEl} />
            </div>
            {/* {chatLog.length > 0 && <AgentModal />} */}
          </div>
        )}

        {/* Error alert */}
        {error && <AppAlert className="mb-4">{error.message}</AppAlert>}

        {/* Chat input */}
        <ChatInput />
      </div>
    </div>
  )
}

const ChatMessage = ({ message }: { message: Message }): JSX.Element => (
  <div
    className={`max-w-[85%] sm:max-w-[75%] py-4 px-6 rounded-2xl transition-transform duration-300 hover:scale-[1.02] ${
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
      {message.content}
    </Markdown>

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
