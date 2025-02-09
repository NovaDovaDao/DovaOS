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
  Textarea,
  Switch
} from '@headlessui/react'
import {
  Settings,
  MessageSquare, // for Discord
  Send, // for Telegram
  XIcon // for Twitter/X
} from 'lucide-react'
import { clsx } from 'clsx'
import { useState } from 'react'
import AppButton from '@renderer/components/app/AppButton'

interface PlatformConfig {
  enabled: boolean
  credentials?: string
}

interface AgentPlatforms {
  x: PlatformConfig
  discord: PlatformConfig
  telegram: PlatformConfig
}

export default function AgentModal(): JSX.Element {
  const { isAgentModalOpen, setIsAgentModalOpen } = useAppStore()
  const [platforms, setPlatforms] = useState<AgentPlatforms>({
    x: { enabled: false },
    discord: { enabled: false },
    telegram: { enabled: false }
  })

  function open(): void {
    setIsAgentModalOpen(true)
  }

  function close(): void {
    setIsAgentModalOpen(false)
  }

  return (
    <>
      <AppButton onClick={open}>
        <Settings className="w-4 h-4 transition-transform group-hover:rotate-180" />
        Configure Agent
      </AppButton>

      <Dialog open={isAgentModalOpen} onClose={close} className="relative z-50">
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />

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

            <AgentConfiguration platforms={platforms} setPlatforms={setPlatforms} />

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

interface AgentConfigurationProps {
  platforms: AgentPlatforms
  setPlatforms: React.Dispatch<React.SetStateAction<AgentPlatforms>>
}

const AgentConfiguration = ({ platforms, setPlatforms }: AgentConfigurationProps): JSX.Element => {
  const togglePlatform = (platform: keyof AgentPlatforms) => {
    setPlatforms((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], enabled: !prev[platform].enabled }
    }))
  }

  return (
    <Fieldset className="space-y-6">
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

      <div className="space-y-4">
        <Label className="text-sm font-medium text-white/90">Platforms</Label>

        <div className="space-y-3">
          {/* X Platform */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <XIcon className="w-5 h-5 text-white/70" />
              <span className="text-sm text-white">X</span>
            </div>
            <Switch
              checked={platforms.x.enabled}
              onChange={() => togglePlatform('x')}
              className={clsx(
                platforms.x.enabled ? 'bg-pink-500' : 'bg-white/10',
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors'
              )}
            >
              <span className="sr-only">Enable X Platform</span>
              <span
                className={clsx(
                  platforms.x.enabled ? 'translate-x-6' : 'translate-x-1',
                  'inline-block h-4 w-4 rounded-full bg-white transition-transform'
                )}
              />
            </Switch>
          </div>

          {/* Discord Platform */}

          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-white/70" />
              <span className="text-sm text-white">Discord</span>
            </div>
            <Switch
              checked={platforms.discord.enabled}
              onChange={() => togglePlatform('discord')}
              className={clsx(
                platforms.discord.enabled ? 'bg-pink-500' : 'bg-white/10',
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors'
              )}
            >
              <span className="sr-only">Enable Discord Platform</span>
              <span
                className={clsx(
                  platforms.discord.enabled ? 'translate-x-6' : 'translate-x-1',
                  'inline-block h-4 w-4 rounded-full bg-white transition-transform'
                )}
              />
            </Switch>
          </div>

          {/* Telegram Platform */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <Send className="w-5 h-5 text-white/70" />
              <span className="text-sm text-white">Telegram</span>
            </div>
            <Switch
              checked={platforms.telegram.enabled}
              onChange={() => togglePlatform('telegram')}
              className={clsx(
                platforms.telegram.enabled ? 'bg-pink-500' : 'bg-white/10',
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors'
              )}
            >
              <span className="sr-only">Enable Telegram Platform</span>
              <span
                className={clsx(
                  platforms.telegram.enabled ? 'translate-x-6' : 'translate-x-1',
                  'inline-block h-4 w-4 rounded-full bg-white transition-transform'
                )}
              />
            </Switch>
          </div>
        </div>
      </div>

      {/* <Field>
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
      </Field> */}
    </Fieldset>
  )
}
