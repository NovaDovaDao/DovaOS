import { ComponentProps, useMemo, useState } from 'react'
import Markdown from 'markdown-to-jsx'
import { useDovaChat } from './useDova'
import AppButton from '@renderer/components/app/AppButton'
import { History } from 'lucide-react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import clsx from 'clsx'
import ChatHistory from '@renderer/components/chat/ChatHistory'

export default function DovaResponse(props: ComponentProps<'div'>): JSX.Element {
  const { messages } = useDovaChat()
  const lastestMessage = useMemo(() => {
    const agentMessages = messages.filter((m) => m.role === 'agent')
    return agentMessages.length ? agentMessages[agentMessages.length - 1] : null
  }, [JSON.stringify(messages)])

  if (!lastestMessage) return <></>

  return (
    <div {...props}>
      <HistoryDialog />
      <Markdown
        className=" prose-sm prose prose-invert break-words max-w-sm overflow-auto max-h-48"
        options={{ forceBlock: true }}
      >
        {lastestMessage.content}
      </Markdown>
    </div>
  )
}

function HistoryDialog(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const { messages } = useDovaChat()

  return (
    <>
      <AppButton
        className="absolute top-4 left-4 text-xs text-neutral-400"
        onClick={() => setIsOpen(true)}
      >
        <History size={12} /> <span>History</span>
      </AppButton>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* Backdrop with blur effect */}
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />

        {/* Full-screen scrollable container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-24">
            <DialogPanel
              className={clsx(
                'w-full max-w-lg transform overflow-hidden rounded-2xl border border-pink-200/20',
                'bg-gradient-to-br from-black/90 to-black/70 p-4 backdrop-blur-xl',
                'shadow-[0_0_50px_-12px] shadow-purple-500/30',
                'transition-all duration-300',
                'animate-in fade-in-0 zoom-in-95'
              )}
            >
              <DialogTitle>History</DialogTitle>

              <ChatHistory messages={messages} />

              <div className=" flex justify-end">
                <AppButton className="min-w-0" onClick={() => setIsOpen(false)}>
                  Close
                </AppButton>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
