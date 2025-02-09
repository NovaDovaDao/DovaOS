import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppFooter from './components/app/AppFooter'
import DovaInterface from './feature/dova/DovaInterface'

const queryClient = new QueryClient()

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  // console.log(ipcHandle())
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen flex flex-col">
        <main className="flex-1 overflow-auto">
          <DovaInterface />
        </main>
        <AppFooter className="border-t border-neutral-800" />
      </div>
    </QueryClientProvider>
  )
}

export default App
