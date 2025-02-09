import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { getDovaChatHistory, Message, sendDovaMessage } from '@renderer/api/ghosts-client'
import { sendElizaMessage } from '@renderer/api/eliza-client'

const DOVA_ID = 'dova'

export const SEND_DOVA_MESSAGE = Symbol('send-dova-message')
export const SEND_ELIZA_MESSAGE = Symbol('send-eliza-message')

const isDova = (agentId: string | null): boolean => agentId === DOVA_ID

export const useChat = (agentId: string | null) => {
  const queryKey = ['chat', isDova(agentId) ? DOVA_ID : agentId]
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      if (isDova(agentId)) {
        return getDovaChatHistory()
      }
      return []
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
  const mutationKey = [isDova(agentId) ? SEND_DOVA_MESSAGE : SEND_ELIZA_MESSAGE]
  const queryClient = useQueryClient()
  const { mutate: sendMessage, ...rest } = useMutation({
    mutationKey,

    mutationFn: async (variables: { content: Message['content'] }) => {
      if (!agentId) return

      // Dova logic
      if (isDova(agentId)) {
        const response = await sendDovaMessage(variables)
        await queryClient.invalidateQueries({
          queryKey: ['chat', DOVA_ID]
        })
        return response
      }

      // Eliza logic
      const setElizaChatMessage = (message: Message) =>
        queryClient.setQueryData(['chat', agentId], (oldData) => {
          console.log('oldData', oldData, message)
          if (!!oldData && Array.isArray(oldData)) {
            oldData.push(message)
            return
          }
          return [message]
        })

      await setElizaChatMessage({
        content: variables.content,
        role: 'user',
        timestamp: Date.now()
      })
      const response = await sendElizaMessage(agentId, {
        text: variables.content,
        userId: 'foo',
        userName: 'Bar'
      })
      const [firstMessage] = response
      await setElizaChatMessage({
        content: firstMessage.text,
        role: 'agent',
        timestamp: Date.now()
      })

      return response
    }
  })
  return {
    ...rest,
    sendMessage
  }
}
