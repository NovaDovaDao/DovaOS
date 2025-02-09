import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Message } from './chat.types'
import ghostsClient from '@renderer/api/ghosts-client'

const DOVA_ID = 'dova'
export const FETCH_DOVA_CHAT = Symbol('dova-chat')
export const SEND_DOVA_MESSAGE = Symbol('send-dova-message')

export const FETCH_ELIZA_CHAT = Symbol('eliza-chat')
export const SEND_ELIZA_MESSAGE = Symbol('send-eliza-message')

export const useChat = (agentId: string | null) => {
  const queryKey = ['chat', agentId === DOVA_ID ? FETCH_DOVA_CHAT : FETCH_ELIZA_CHAT]
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await ghostsClient.get<Message[]>('/chat')
      return data
    },
    enabled: !!agentId,
    retryDelay: 1000 * 30
  })

  const messages = useMemo(
    () => (!!data && Array.isArray(data) ? data.sort((a, b) => a.timestamp - b.timestamp) : []),
    [data]
  )

  return {
    ...rest,
    messages
  }
}

export const useSendMessage = (agentId: string | null) => {
  const mutationKey = [agentId === DOVA_ID ? SEND_DOVA_MESSAGE : SEND_ELIZA_MESSAGE]
  const queryClient = useQueryClient()
  const { mutate: sendMessage, ...rest } = useMutation({
    mutationKey,

    mutationFn: async (variables: { content: Message['content'] }) => {
      if (!agentId) return
      const { data } = await ghostsClient.post<Message>('/chat', variables)

      if (data.role === 'system') throw new Error(data.content)

      await queryClient.invalidateQueries({
        queryKey: ['chat', agentId === DOVA_ID ? FETCH_DOVA_CHAT : FETCH_ELIZA_CHAT]
      })

      return data
    }
  })
  return {
    ...rest,
    sendMessage
  }
}
