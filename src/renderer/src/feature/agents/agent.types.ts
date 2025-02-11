export interface AgentConfiguration {
  id: string
  character?: {
    name: string
    clients: string[]
    modelProvider: string
    secrets?: Record<string, string>
    settings: {
      voice: {
        model: string
      }
    }
    plugins: []
    bio: string[]
    lore: string[]
    knowledge: string[]
    messageExamples: [
      [
        {
          user: string
          content: {
            text: string
          }
        }
      ]
    ]
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
