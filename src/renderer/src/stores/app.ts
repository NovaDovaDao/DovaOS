import { create } from 'zustand'

interface AppState {
  agentId: string | null
  setAgentId: (id: string | null) => void

  isAgentModalOpen: boolean
  setIsAgentModalOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  agentId: null,
  setAgentId: (id): void => set({ agentId: id }),

  isAgentModalOpen: false,
  setIsAgentModalOpen: (open): void => set({ isAgentModalOpen: open })
}))
