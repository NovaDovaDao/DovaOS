import ghostsClient from '@renderer/api/ghosts-client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export const FETCH_CHAT = Symbol('dova-chat')

export interface Message {
  content: string
  timestamp: number
  role: 'user' | 'agent' | 'system'
}

export const useDovaChat = () => {
  const { data, ...rest } = useQuery({
    queryKey: [FETCH_CHAT],
    queryFn: async () => {
      const { data } = await ghostsClient.get<Message[]>('/chat')
      return data
    },
    retryDelay: 1000 * 30
  })

  const messages = useMemo(
    () => (data && Array.isArray(data) ? data.sort((a, b) => a.timestamp - b.timestamp) : []),
    [data]
  )

  return {
    ...rest,
    messages
  }
}

export const useDovaSendMessage = () => {
  const queryClient = useQueryClient()
  const { mutate: sendMessage, ...rest } = useMutation({
    mutationKey: ['chat', 'send'],
    mutationFn: async (variables: { content: Message['content'] }) => {
      const { data } = await ghostsClient.post<Message>('/chat', variables)

      if (data.role === 'system') throw new Error(data.content)

      return data
    },
    onSuccess: async () => await queryClient.invalidateQueries({ queryKey: [FETCH_CHAT] })
  })
  return {
    ...rest,
    sendMessage
  }
}
