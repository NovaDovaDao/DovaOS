import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppHeader from '@renderer/components/app/AppHeader'
import AppNav from '@renderer/components/app/AppNav'
// import ChatWindow from '@renderer/feature/chat/ChatWindow'

const queryClient = new QueryClient()

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  console.log(ipcHandle())

  return (
    <QueryClientProvider client={queryClient}>
      <AppHeader />
      <AppNav />
      {/* <ChatWindow /> */}
    </QueryClientProvider>
  )
}

export default App
