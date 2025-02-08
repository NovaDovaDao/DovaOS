// src/renderer/src/components/agent/AgentModal.tsx
import { useAppStore } from '@renderer/stores/app'
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Fieldset,
  Input,
  Label,
  Textarea
} from '@headlessui/react'
import { Settings } from 'lucide-react'
import { clsx } from 'clsx'

export default function AgentModal(): JSX.Element {
  const { isAgentModalOpen, setIsAgentModalOpen } = useAppStore()

  function open(): void {
    setIsAgentModalOpen(true)
  }

  function close(): void {
    setIsAgentModalOpen(false)
  }

  return (
    <>
      <Button
        onClick={open}
        className={clsx(
          'relative flex items-center gap-2 rounded-lg bg-black/40 backdrop-blur-sm',
          'py-2 px-4 text-sm font-medium text-white shadow-lg',
          'transition-all duration-300 ease-out',
          'hover:bg-black/60 hover:scale-105 hover:shadow-pink-500/20',
          'focus:outline-none focus:ring-2 focus:ring-pink-500/40',
          'group'
        )}
      >
        <Settings className="w-4 h-4 transition-transform group-hover:rotate-180" />
        Configure Agent
      </Button>

      <Dialog open={isAgentModalOpen} onClose={close} className="relative z-50">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />

        {/* Full-screen container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            className={clsx(
              'w-full max-w-md transform overflow-hidden rounded-2xl',
              'bg-gradient-to-br from-black/90 to-black/70 p-6 backdrop-blur-xl',
              'shadow-[0_0_50px_-12px] shadow-pink-500/30',
              'transition-all duration-300',
              'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95'
            )}
          >
            <DialogTitle className="text-xl font-bold text-white mb-4">
              Agent Configuration
            </DialogTitle>

            <AgentConfiguration />

            <div className="mt-6 flex justify-end gap-3">
              <Button
                onClick={close}
                className={clsx(
                  'px-4 py-2 rounded-lg',
                  'bg-white/5 text-white',
                  'hover:bg-white/10 transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-pink-500/40'
                )}
              >
                Cancel
              </Button>
              <Button
                onClick={close}
                className={clsx(
                  'px-4 py-2 rounded-lg',
                  'bg-gradient-to-r from-pink-500 to-purple-500',
                  'text-white font-medium',
                  'hover:from-pink-600 hover:to-purple-600',
                  'transition-all duration-300',
                  'focus:outline-none focus:ring-2 focus:ring-pink-500/40'
                )}
              >
                Save Changes
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

const AgentConfiguration = (): JSX.Element => {
  return (
    <Fieldset className="space-y-4">
      <Field>
        <Label className="text-sm font-medium text-white/90">Name</Label>
        <Input
          className={clsx(
            'mt-1.5 w-full rounded-lg',
            'bg-white/5 border-white/10',
            'text-white placeholder-white/30',
            'focus:border-pink-500/50 focus:ring-pink-500/30',
            'transition-colors duration-200'
          )}
          placeholder="Enter agent name..."
        />
      </Field>

      <Field>
        <Label className="text-sm font-medium text-white/90">Description</Label>
        <Textarea
          className={clsx(
            'mt-1.5 w-full rounded-lg',
            'bg-white/5 border-white/10',
            'text-white placeholder-white/30',
            'focus:border-pink-500/50 focus:ring-pink-500/30',
            'transition-colors duration-200',
            'min-h-[100px] resize-none'
          )}
          placeholder="Describe your agent's purpose..."
        />
      </Field>

      <Field>
        <Label className="text-sm font-medium text-white/90">System Message</Label>
        <Textarea
          className={clsx(
            'mt-1.5 w-full rounded-lg',
            'bg-white/5 border-white/10',
            'text-white placeholder-white/30',
            'focus:border-pink-500/50 focus:ring-pink-500/30',
            'transition-colors duration-200',
            'min-h-[100px] resize-none'
          )}
          placeholder="Define the agent's behavior..."
        />
      </Field>
    </Fieldset>
  )
}
