import { ComponentProps } from 'react'
import { useAgents } from './useAgents'
import { User } from 'lucide-react'
import clsx from 'clsx'
import { useAppStore } from '@renderer/stores/app'

export default function AgentList({ className, ...props }: ComponentProps<'div'>): JSX.Element {
  const { agents } = useAgents()
  const { setAgentId } = useAppStore()

  return (
    <div {...props} className={clsx(className, '')}>
      {agents.map((agent, i) => (
        <button
          key={i}
          onClick={() => setAgentId(agent.id)}
          className="bg-rose-600/10 rounded-xl p-4 text-rose-300/70 relative"
        >
          <div className="mx-auto w-12 h-12 flex items-center justify-center bg-rose-600/20 rounded-full">
            <User size={18} className="text-white" />
          </div>
          <div>{agent.name}</div>
        </button>
      ))}
    </div>
  )
}
