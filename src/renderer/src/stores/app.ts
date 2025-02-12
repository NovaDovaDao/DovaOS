import { create } from 'zustand'

interface AppState {
  agentId: string | null
  setAgentId: (id: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  agentId: null,
  setAgentId: (id): void => set({ agentId: id })
}))
