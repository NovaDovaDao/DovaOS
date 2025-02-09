import { formatDistanceToNow } from 'date-fns'
import Markdown from 'markdown-to-jsx'

const ChatMessage = ({
  message
}: {
  message: { role: 'user' | 'agent' | 'system'; content: string; timestamp: number }
}): JSX.Element => (
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

export default ChatMessage
