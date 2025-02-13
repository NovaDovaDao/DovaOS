import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Switch
} from '@headlessui/react'
import {
  Settings,
  MessageSquare,
  Send,
  XIcon,
  KeyRound,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { clsx } from 'clsx'
import { useEffect, useState } from 'react'
import AppButton from '@renderer/components/app/AppButton'
import { AgentConfiguration } from './agent.types'
import { useUpdateAgent } from './useAgents'

export default function AgentModal({
  characterConfig
}: {
  characterConfig: AgentConfiguration['character'] | null
}): JSX.Element {
  const [open, setOpen] = useState(false)
  const [platforms, setPlatforms] = useState(parseConfig(characterConfig))

  useEffect(() => {
    if (open) setPlatforms(parseConfig(characterConfig))
  }, [open, characterConfig])

  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({})

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const updateCredential = (platform: keyof typeof platforms, field: string, value: string) => {
    setPlatforms((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        credentials: {
          ...prev[platform].credentials,
          [field]: value
        }
      }
    }))
  }

  const { mutateAsync: updateAgent } = useUpdateAgent(characterConfig?.id)
  const handleSave = async () => {
    if (!characterConfig) return

    const socialClients = Object.entries(platforms).reduce((result: string[], [key, value]) => {
      if (value.enabled) {
        switch (key) {
          case 'x':
            result.push('twitter')
            break
          case 'discord':
            result.push('discord')
            break
          case 'telegram':
            result.push('telegram')
            break
        }
      }
      return result
    }, [])
    await updateAgent({
      character: {
        ...characterConfig,
        clients: ['direct'].concat(socialClients),
        settings: {
          ...characterConfig.settings,

          secrets: {
            ...characterConfig.settings.secrets,
            DISCORD_API_TOKEN: platforms.discord.credentials?.apiToken,
            DISCORD_APPLICATION_ID: platforms.discord.credentials?.applicationId,
            OPENAI_API_KEY: platforms.openai.credentials.apiKey,
            TELEGRAM_BOT_TOKEN: platforms.telegram.credentials.botToken,
            TWITTER_USERNAME: platforms.x.credentials?.username
          }
        }
      }
    })
    setOpen(false)
  }
  return (
    <>
      <AppButton onClick={() => setOpen(true)}>
        <Settings className="w-4 h-4 transition-transform group-hover:rotate-180" />
        Configure Agent
      </AppButton>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            className={clsx(
              'w-full max-w-2xl transform overflow-hidden rounded-2xl',
              'bg-gradient-to-br from-black/90 to-black/70 p-6 backdrop-blur-xl',
              'shadow-[0_0_50px_-12px] shadow-pink-500/30',
              'transition-all duration-300'
            )}
          >
            <DialogTitle className="text-xl font-bold text-white mb-4">
              Agent Configuration
            </DialogTitle>

            <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-6">
              {/* OpenAI Section */}
              <div className="space-y-4 rounded-lg bg-white/5 p-4">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection('openai')}
                >
                  <div className="flex items-center gap-3">
                    <KeyRound className="w-5 h-5 text-white/70" />
                    <span className="text-sm text-white">OpenAI Configuration</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={platforms.openai.enabled}
                      onChange={() =>
                        setPlatforms((prev) => ({
                          ...prev,
                          openai: { ...prev.openai, enabled: !prev.openai.enabled }
                        }))
                      }
                      className={clsx(
                        platforms.openai.enabled ? 'bg-pink-500' : 'bg-white/10',
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors'
                      )}
                    >
                      <span
                        className={clsx(
                          platforms.openai.enabled ? 'translate-x-6' : 'translate-x-1',
                          'inline-block h-4 w-4 rounded-full bg-white transition-transform'
                        )}
                      />
                    </Switch>
                    {expandedSections.openai ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>

                {expandedSections.openai && (
                  <Field className="mt-4">
                    <Label className="text-sm font-medium text-white/90">API Key</Label>
                    <div className="relative mt-1.5">
                      <Input
                        type={showPasswords.openaiKey ? 'text' : 'password'}
                        value={platforms.openai.credentials?.apiKey}
                        onChange={(e) => updateCredential('openai', 'apiKey', e.target.value)}
                        className={clsx(
                          'w-full rounded-lg pr-10',
                          'bg-white/5 border-white/10',
                          'text-white placeholder-white/30',
                          'focus:border-pink-500/50 focus:ring-pink-500/30'
                        )}
                        placeholder="sk-..."
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('openaiKey')}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPasswords.openaiKey ? (
                          <EyeOff className="w-4 h-4 text-white/50" />
                        ) : (
                          <Eye className="w-4 h-4 text-white/50" />
                        )}
                      </button>
                    </div>
                  </Field>
                )}
              </div>

              {/* Discord Section */}
              <div className="space-y-4 rounded-lg bg-white/5 p-4">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection('discord')}
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-white/70" />
                    <span className="text-sm text-white">Discord Configuration</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={platforms.discord.enabled}
                      onChange={() =>
                        setPlatforms((prev) => ({
                          ...prev,
                          discord: { ...prev.discord, enabled: !prev.discord.enabled }
                        }))
                      }
                      className={clsx(
                        platforms.discord.enabled ? 'bg-pink-500' : 'bg-white/10',
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors'
                      )}
                    >
                      <span
                        className={clsx(
                          platforms.discord.enabled ? 'translate-x-6' : 'translate-x-1',
                          'inline-block h-4 w-4 rounded-full bg-white transition-transform'
                        )}
                      />
                    </Switch>
                    {expandedSections.discord ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>

                {expandedSections.discord && (
                  <div className="space-y-4 mt-4">
                    <Field>
                      <Label className="text-sm font-medium text-white/90">Application ID</Label>
                      <Input
                        value={platforms.discord.credentials?.applicationId}
                        onChange={(e) =>
                          updateCredential('discord', 'applicationId', e.target.value)
                        }
                        className={clsx(
                          'mt-1.5 w-full rounded-lg',
                          'bg-white/5 border-white/10',
                          'text-white placeholder-white/30',
                          'focus:border-pink-500/50 focus:ring-pink-500/30'
                        )}
                      />
                    </Field>
                    <Field>
                      <Label className="text-sm font-medium text-white/90">API Token</Label>
                      <div className="relative mt-1.5">
                        <Input
                          type={showPasswords.discordToken ? 'text' : 'password'}
                          value={platforms.discord.credentials?.apiToken}
                          onChange={(e) => updateCredential('discord', 'apiToken', e.target.value)}
                          className={clsx(
                            'w-full rounded-lg pr-10',
                            'bg-white/5 border-white/10',
                            'text-white placeholder-white/30',
                            'focus:border-pink-500/50 focus:ring-pink-500/30'
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('discordToken')}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPasswords.discordToken ? (
                            <EyeOff className="w-4 h-4 text-white/50" />
                          ) : (
                            <Eye className="w-4 h-4 text-white/50" />
                          )}
                        </button>
                      </div>
                    </Field>
                  </div>
                )}
              </div>

              {/* Telegram Section */}
              <div className="space-y-4 rounded-lg bg-white/5 p-4">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection('telegram')}
                >
                  <div className="flex items-center gap-3">
                    <Send className="w-5 h-5 text-white/70" />
                    <span className="text-sm text-white">Telegram Configuration</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={platforms.telegram.enabled}
                      onChange={() =>
                        setPlatforms((prev) => ({
                          ...prev,
                          telegram: { ...prev.telegram, enabled: !prev.telegram.enabled }
                        }))
                      }
                      className={clsx(
                        platforms.telegram.enabled ? 'bg-pink-500' : 'bg-white/10',
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors'
                      )}
                    >
                      <span
                        className={clsx(
                          platforms.telegram.enabled ? 'translate-x-6' : 'translate-x-1',
                          'inline-block h-4 w-4 rounded-full bg-white transition-transform'
                        )}
                      />
                    </Switch>
                    {expandedSections.telegram ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>

                {expandedSections.telegram && (
                  <Field className="mt-4">
                    <Label className="text-sm font-medium text-white/90">Bot Token</Label>
                    <div className="relative mt-1.5">
                      <Input
                        type={showPasswords.telegramToken ? 'text' : 'password'}
                        value={platforms.telegram.credentials?.botToken}
                        onChange={(e) => updateCredential('telegram', 'botToken', e.target.value)}
                        className={clsx(
                          'w-full rounded-lg pr-10',
                          'bg-white/5 border-white/10',
                          'text-white placeholder-white/30',
                          'focus:border-pink-500/50 focus:ring-pink-500/30'
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('telegramToken')}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPasswords.telegramToken ? (
                          <EyeOff className="w-4 h-4 text-white/50" />
                        ) : (
                          <Eye className="w-4 h-4 text-white/50" />
                        )}
                      </button>
                    </div>
                  </Field>
                )}
              </div>

              {/* X/Twitter Section */}
              <div className="space-y-4 rounded-lg bg-white/5 p-4">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleSection('twitter')}
                >
                  <div className="flex items-center gap-3">
                    <XIcon className="w-5 h-5 text-white/70" />
                    <span className="text-sm text-white">X/Twitter Configuration</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={platforms.x.enabled}
                      onChange={() =>
                        setPlatforms((prev) => ({
                          ...prev,
                          x: { ...prev.x, enabled: !prev.x.enabled }
                        }))
                      }
                      className={clsx(
                        platforms.x.enabled ? 'bg-pink-500' : 'bg-white/10',
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors'
                      )}
                    >
                      <span
                        className={clsx(
                          platforms.x.enabled ? 'translate-x-6' : 'translate-x-1',
                          'inline-block h-4 w-4 rounded-full bg-white transition-transform'
                        )}
                      />
                    </Switch>
                    {expandedSections.twitter ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>

                {expandedSections.twitter && (
                  <div className="space-y-4 mt-4">
                    <Field>
                      <Label className="text-sm font-medium text-white/90">Username</Label>
                      <Input
                        value={platforms.x.credentials?.username}
                        onChange={(e) => updateCredential('x', 'username', e.target.value)}
                        className={clsx(
                          'mt-1.5 w-full rounded-lg',
                          'bg-white/5 border-white/10',
                          'text-white placeholder-white/30',
                          'focus:border-pink-500/50 focus:ring-pink-500/30'
                        )}
                        placeholder="@username"
                      />
                    </Field>
                    <Field>
                      <Label className="text-sm font-medium text-white/90">Email</Label>
                      <Input
                        type="email"
                        value={platforms.x.credentials?.email}
                        onChange={(e) => updateCredential('x', 'email', e.target.value)}
                        className={clsx(
                          'mt-1.5 w-full rounded-lg',
                          'bg-white/5 border-white/10',
                          'text-white placeholder-white/30',
                          'focus:border-pink-500/50 focus:ring-pink-500/30'
                        )}
                        placeholder="email@example.com"
                      />
                    </Field>
                    <Field>
                      <Label className="text-sm font-medium text-white/90">Password</Label>
                      <div className="relative mt-1.5">
                        <Input
                          type={showPasswords.twitterPassword ? 'text' : 'password'}
                          value={platforms.x.credentials?.password}
                          onChange={(e) => updateCredential('x', 'password', e.target.value)}
                          className={clsx(
                            'w-full rounded-lg pr-10',
                            'bg-white/5 border-white/10',
                            'text-white placeholder-white/30',
                            'focus:border-pink-500/50 focus:ring-pink-500/30'
                          )}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility('twitterPassword')}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPasswords.twitterPassword ? (
                            <EyeOff className="w-4 h-4 text-white/50" />
                          ) : (
                            <Eye className="w-4 h-4 text-white/50" />
                          )}
                        </button>
                      </div>
                    </Field>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
              <Button
                onClick={() => setOpen(false)}
                className={clsx(
                  'px-4 py-2 rounded-lg w-full sm:w-auto',
                  'bg-white/5 text-white',
                  'hover:bg-white/10 transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-pink-500/40'
                )}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className={clsx(
                  'px-4 py-2 rounded-lg w-full sm:w-auto',
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

const parseConfig = (characterConfig: AgentConfiguration['character'] | null) => {
  const { clients = [], settings: { secrets = {} } = {} } = characterConfig ?? {}
  return {
    x: {
      enabled: clients.includes('twitter'),
      credentials: {
        email: secrets.TWITTER_EMAIL ?? '',
        password: secrets.TWITTER_PASSWORD ?? '',
        username: secrets.TWITTER_USERNAME ?? ''
      }
    },
    discord: {
      enabled: clients.includes('discord'),
      credentials: {
        apiToken: secrets.DISCORD_API_TOKEN ?? '',
        applicationId: secrets.DISCORD_APPLICATION_ID ?? ''
      }
    },
    openai: {
      enabled: clients.length > 0,
      credentials: {
        apiKey: secrets.OPENAI_API_KEY ?? ''
      }
    },
    telegram: {
      enabled: clients.includes('telegram'),
      credentials: {
        botToken: secrets.TELEGRAM_BOT_TOKEN ?? ''
      }
    }
  }
}
