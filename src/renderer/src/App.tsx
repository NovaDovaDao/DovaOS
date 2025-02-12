import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppFooter from './components/app/AppFooter'
import DovaInterface from './feature/dova/DovaInterface'
import { useAppStore } from './stores/app'
import ChatWindow from './feature/chat/ChatWindow'

const queryClient = new QueryClient()

function App(): JSX.Element {
  const { agentId } = useAppStore()

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen flex flex-col">
        <main className="flex-1 overflow-auto">{agentId ? <ChatWindow /> : <DovaInterface />}</main>
        <AppFooter className="border-t border-neutral-800" />
      </div>
    </QueryClientProvider>
  )
}

export default App
