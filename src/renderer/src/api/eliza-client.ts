import { AgentConfiguration } from '@renderer/feature/agents/agent.types'
import axios from 'axios'

const client = axios.create({
  baseURL: '/api'
})

interface AgentsResponse {
  agents: { clients: never[]; name: string; id: string }[]
}
export const getAgents = async (): Promise<AgentsResponse['agents']> => {
  const { data } = await client.get<AgentsResponse>('/agents')
  return data.agents
}

export const getAgent = async (agentId: string): Promise<AgentConfiguration> => {
  const { data } = await client.get<AgentConfiguration>('/agents/' + agentId)
  return data
}

export const setAgent = async (agentId: string, character: AgentConfiguration['character']) => {
  const { data } = await client.post<AgentConfiguration>('/agents/' + agentId + '/set', character)
  console.log('setting agent settings', data)
  return data
}

interface ElizaMemoriesResponse {
  agentId: string
  roomId: string
  memories: [
    {
      id: string
      userId: string
      agentId: string
      createdAt: number
      content: {
        text: string
        source: string
        attachments: []
      }
      embedding: {
        type: string
        data: number[]
      }
      roomId: string
      unique: number
    }
  ]
}
export const getElizaMemories = async (agentId: string): Promise<ElizaMemoriesResponse> => {
  const { data } = await client.get<ElizaMemoriesResponse>(agentId + '/memories')
  return data
}

type AgentMessageResponse = {
  action: 'NONE'
  text: string
  user: string // agent name
}[]
export const sendElizaMessage = async (
  agentId: string,
  payload: {
    text: string
    userId: string
    userName: string
  }
): Promise<AgentMessageResponse> => {
  const { data } = await client.post<AgentMessageResponse>(`/${agentId}/message`, payload)
  return data
}
