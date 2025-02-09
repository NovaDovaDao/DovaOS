import { useEffect, useMemo, useRef } from 'react'
import { formatDistanceToNow } from 'date-fns'
import Markdown from 'markdown-to-jsx'

type Props = {
  messages: { content: string; timestamp: number; role: 'user' | 'agent' | 'system' }[]
  isLoading?: boolean
}
const ChatHistory = ({ messages, isLoading }: Props): JSX.Element => {
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
    <div className="flex flex-col h-full items-center justify-center">
      <div className="w-full max-w-3xl px-4">
        {/* Messages Area */}
        {messages.length > 0 && (
          <div className="relative flex-1 overflow-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent mb-8">
            <div className="space-y-2">
              {chatLog.map((message, i) => (
                <article
                  key={message.timestamp}
                  className={`flex flex-col w-full relative group animate-slideIn ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <ChatMessage message={message} />
                </article>
              ))}
              <div ref={lastEl} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const ChatMessage = ({ message }: { message: Props['messages'][0] }): JSX.Element => (
  <div
    className={`max-w-[85%] sm:max-w-[75%] py-2 px-4 rounded-2xl ${
      message.role === 'user'
        ? 'ml-auto bg-pink-500/10 hover:bg-pink-500/20'
        : 'mr-auto bg-purple-500/10 hover:bg-purple-500/20'
    }`}
  >
    <header
      className={`absolute -top-8 text-nowrap mb-2 transition-all duration-300 opacity-0 group-hover:opacity-100 ${
        message.role === 'user' ? 'text-right right-4' : ' '
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
        <span className="inline-block uppercase tracking-widest text-[10px] text-pink-400">
          — Dova
        </span>
      )}
    </footer>
  </div>
)

export default ChatHistory
