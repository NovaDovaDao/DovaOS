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
    enabled: !!agentId,
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
    mutationFn: async ({ settings }: { settings: AgentConfiguration['character'] }) => {
      if (!agentId) return

      return setAgent(agentId, settings)
    },
    onSuccess: (settings) =>
      queryClient.setQueryData(
        ['agent', agentId],
        (oldData: Awaited<ReturnType<typeof getAgent>>) => {
          console.log('ehllo?')
          return {
            ...oldData,
            character: settings
          }
        }
      )
  })
  return {
    ...rest,
    updateAgent
  }
}
