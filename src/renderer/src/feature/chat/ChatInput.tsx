// src/renderer/src/feature/chat/ChatInput.tsx
import { useState } from 'react'
import { Button, Textarea } from '@headlessui/react'
import { Send } from 'lucide-react'
import { useSendMessage } from './useChat'
import AppAlert from '@renderer/components/app/AppAlert'

export default function ChatInput(): JSX.Element {
  const { sendMessage, isPending, error } = useSendMessage()
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSendMessage = (e: React.FormEvent): void => {
    if (isPending) return
    e.preventDefault()
    e.stopPropagation()
    if (!inputValue.trim()) return

    sendMessage({ content: inputValue })
    setInputValue('')
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSendMessage} className="relative">
        {error && <AppAlert className="mb-4">{error?.message}</AppAlert>}

        {/* Input container */}
        <div className="relative group">
          <div
            className={`absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`}
          />

          <div className="relative bg-black/40 rounded-lg backdrop-blur-sm transition-all duration-300 group-hover:bg-black/60">
            <Textarea
              autoFocus
              value={inputValue}
              readOnly={isPending}
              onChange={(ev) => setInputValue(ev.currentTarget.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Type your message..."
              className="form-input bg-transparent border-none text-lg w-full text-white placeholder-white/40 focus:ring-0 min-h-[60px] resize-none pr-12 py-4 px-6"
            />

            <Button
              type="submit"
              disabled={isPending}
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
