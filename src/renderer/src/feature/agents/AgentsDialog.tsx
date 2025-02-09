// src/renderer/src/components/agent/AgentsDialog.tsx
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Users } from 'lucide-react'
import { useState } from 'react'
import AgentList from '@renderer/feature/agents/AgentsList'
import clsx from 'clsx'
import AppButton from '../../components/app/AppButton'

export default function AgentsDialog(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <AppButton onClick={() => setIsOpen(true)}>
        <Users className="w-4 h-4 transition-transform group-hover:scale-110" />
        View Agents
      </AppButton>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* Backdrop with blur effect */}
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />

        {/* Full-screen scrollable container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              className={clsx(
                'w-full max-w-2xl transform overflow-hidden rounded-2xl',
                'bg-gradient-to-br from-black/90 to-black/70 p-6 backdrop-blur-xl',
                'shadow-[0_0_50px_-12px] shadow-purple-500/30',
                'transition-all duration-300',
                'animate-in fade-in-0 zoom-in-95'
              )}
            >
              <DialogTitle
                className={clsx(
                  'text-xl font-bold text-white mb-4',
                  'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
                )}
              >
                Available Agents
              </DialogTitle>

              {/* Custom scrollbar styling */}
              <div
                className={clsx(
                  'max-h-[70vh] overflow-y-auto pr-2',
                  'scrollbar-thin scrollbar-track-black/20 scrollbar-thumb-purple-500/50'
                )}
              >
                <AgentList className="p-2" />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'px-4 py-2 rounded-lg',
                    'bg-gradient-to-r from-purple-500 to-pink-500',
                    'text-white font-medium',
                    'hover:from-purple-600 hover:to-pink-600',
                    'transition-all duration-300',
                    'focus:outline-none focus:ring-2 focus:ring-purple-500/40'
                  )}
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
