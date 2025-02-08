// src/renderer/src/App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppHeader from '@renderer/components/app/AppHeader'
import ChatWindow from '@renderer/feature/chat/ChatWindow'

const queryClient = new QueryClient()

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  // console.log(ipcHandle())
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-black text-white">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 flex flex-col">
          <div className="flex-1 overflow-auto p-8">
            <AppHeader className="h-full" />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5" />

          {/* Content */}
          <div className="relative h-full">
            <ChatWindow />
          </div>
        </main>
      </div>
    </QueryClientProvider>
  )
}

export default App
