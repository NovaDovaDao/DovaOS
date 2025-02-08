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
