import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ChatWindow from '@renderer/feature/chat/ChatWindow'
import AppFooter from './components/app/AppFooter'

const queryClient = new QueryClient()

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  // console.log(ipcHandle())
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen flex flex-col">
        <main className="flex-1 overflow-auto">
          <ChatWindow />
        </main>
        <AppFooter className="border-t border-neutral-800" />
      </div>
    </QueryClientProvider>
  )
}

export default App
