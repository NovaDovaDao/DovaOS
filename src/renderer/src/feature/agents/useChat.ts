import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Message } from './chat.types'
import { FETCH_AGENT, FETCH_CHAT } from '../../utils/query.keys'

export const useChat = () => {
  const { data, ...rest } = useQuery({
    queryKey: [FETCH_CHAT],
    queryFn: async () => {
      // const { data } = await ghostsClient.get<Message[]>("/chat");
      // return data;
    },
    retryDelay: 1000 * 30
  })

  const messages = useMemo(() => data ?? [], [data])

  return {
    ...rest,
    messages
  }
}

export const useSendMessage = () => {
  const queryClient = useQueryClient()
  const { mutate: sendMessage, ...rest } = useMutation({
    mutationKey: ['chat', 'send'],
    mutationFn: async (_variables: { content: Message['content'] }) => {
      // const { data } = await ghostsClient.post<Message>("/chat", variables);
      // if (data.role === "system") throw new Error(data.content);
      // return data;
    },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: [FETCH_CHAT] }),
        queryClient.invalidateQueries({ queryKey: [FETCH_AGENT] })
      ])
  })
  return {
    ...rest,
    sendMessage
  }
}
