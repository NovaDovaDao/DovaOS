// src/renderer/src/feature/chat/ChatInput.tsx
import { ComponentProps, useState } from 'react'
import { Button, Textarea } from '@headlessui/react'
import { Send } from 'lucide-react'
import clsx from 'clsx'

type Props = {
  isLoading: boolean
  onSendMessage: (message: string) => void
}
export default function ChatInput({
  isLoading,
  onSendMessage,
  className,
  ...props
}: ComponentProps<'div'> & Props): JSX.Element {
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = (e: React.FormEvent): void => {
    if (isLoading) return
    e.preventDefault()
    e.stopPropagation()
    if (!inputValue.trim()) return

    onSendMessage(inputValue)
    setInputValue('')
  }

  return (
    <div {...props} className={clsx('relative w-full', className)}>
      <form onSubmit={handleSendMessage} className="relative">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur-2xl transition-opacity duration-300" />

          <div className="relative bg-black/40 rounded-lg backdrop-blur-sm transition-all duration-300 group-hover:bg-black/60">
            <Textarea
              autoFocus
              value={inputValue}
              readOnly={isLoading}
              onChange={(ev) => setInputValue(ev.currentTarget.value)}
              placeholder="Type your message..."
              className="form-input bg-transparent border-none text-lg w-full text-white placeholder-white/40 ring-1 ring-pink-400/20 rounded-lg focus:ring-pink-400/50 min-h-[60px] resize-none pr-12 py-4 px-6"
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="absolute bottom-4 right-4 text-white/80 transition-all duration-300 hover:text-pink-400 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
