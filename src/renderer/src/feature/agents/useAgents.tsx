import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { FETCH_AGENT } from '@renderer/utils/query.keys'
import { getAgents } from '@renderer/api/eliza-client'

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
