export interface AgentConfiguration {
  id: string
  character?: {
    name: string
    clients: string[]
    modelProvider: string
    settings: {
      secrets?: Record<string, string>
      voice: {
        model: string
      }
    }
    plugins: []
    bio: string[]
    lore: string[]
    knowledge: string[]
    messageExamples: {
      user: string
      content: {
        text: string
      }
    }[][]

    postExamples: string[]
    topics: string[]
    style: {
      all: string[]
      chat: string[]
      post: string[]
    }
    adjectives: string[]
    id: string
    username: string
  }
}
