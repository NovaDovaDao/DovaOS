// src/renderer/src/feature/agents/useAgentConfig.ts
import { useState, useEffect } from 'react'
import { AgentPlatforms } from './types'

const STORAGE_KEY = 'agent-config'

export const useAgentConfig = () => {
  const [config, setConfig] = useState<AgentPlatforms>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (error) {
        console.error('Failed to parse stored config:', error)
      }
    }
    return {
      x: { enabled: false, credentials: {} },
      discord: { enabled: false, credentials: {} },
      telegram: { enabled: false, credentials: {} },
      openai: { enabled: false, credentials: {} }
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  }, [config])

  return {
    config,
    setConfig
  }
}
