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
