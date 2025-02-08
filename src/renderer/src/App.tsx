import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppHeader from '@renderer/components/app/AppHeader'
// import ChatWindow from '@renderer/feature/chat/ChatWindow'

const queryClient = new QueryClient()

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  // console.log(ipcHandle())

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex divide-x-2 h-screen">
        <aside className="p-8">
          <AppHeader />
        </aside>
        <main className="overflow-auto p-8">chat{/* <ChatWindow /> */}</main>
      </div>
    </QueryClientProvider>
  )
}

export default App
