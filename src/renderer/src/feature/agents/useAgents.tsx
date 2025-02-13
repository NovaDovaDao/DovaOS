import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { FETCH_AGENT } from '@renderer/utils/query.keys'
import { getAgent, getAgents, setAgent } from '@renderer/api/eliza-client'
import { AgentConfiguration } from './agent.types'

export const useAgents = () => {
  const { data, ...rest } = useQuery({
    queryKey: [FETCH_AGENT],
    queryFn: getAgents,
    retryDelay: 1000 * 30
  })

  const agents = useMemo(() => data ?? [], [data])

  return {
    ...rest,
    agents
  }
}

export const useAgent = (agentId: string | null) => {
  const { data: agent, ...rest } = useQuery({
    queryKey: [FETCH_AGENT],
    queryFn: () => getAgent(agentId!),
    enabled: !!agentId && agentId !== 'dova',
    retryDelay: 1000 * 30
  })

  return {
    ...rest,
    agent
  }
}

export const useUpdateAgent = (agentId?: string | null) => {
  const mutationKey = ['update-agent', agentId]
  const queryClient = useQueryClient()
  const { mutate: updateAgent, ...rest } = useMutation({
    mutationKey,
    mutationFn: async ({ character }: { character: AgentConfiguration['character'] }) => {
      if (!agentId) return

      return setAgent(agentId, character)
    },
    onSuccess: (data) => queryClient.setQueryData(['agent', agentId], () => data)
  })
  return {
    ...rest,
    updateAgent
  }
}
