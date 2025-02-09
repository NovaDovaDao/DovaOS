import { ComponentProps } from 'react'
import { useAgents } from './useAgents'
import { User } from 'lucide-react'
import clsx from 'clsx'
import { useAppStore } from '@renderer/stores/app'

export default function AgentList({
  className,
  includeDova,
  ...props
}: ComponentProps<'div'> & { includeDova?: boolean }): JSX.Element {
  const { agents } = useAgents()
  const { setAgentId } = useAppStore()

  return (
    <div {...props} className={clsx(className, 'space-x-4')}>
      {includeDova && (
        <AgentBtn onClick={() => setAgentId(null)} className="border border-rose-600/20">
          Dova
        </AgentBtn>
      )}
      {agents.map((agent, i) => (
        <AgentBtn key={i} onClick={() => setAgentId(agent.id)}>
          {agent.name}
        </AgentBtn>
      ))}
    </div>
  )
}

const AgentBtn = ({ children, className, ...props }: ComponentProps<'button'>): JSX.Element => {
  return (
    <button
      {...props}
      className={clsx('bg-rose-600/10 rounded-xl p-4 text-rose-300/70 relative w-32', className)}
    >
      <span className="mx-auto w-12 h-12 flex items-center justify-center bg-rose-600/20 rounded-full">
        <User size={18} className="text-white" />
      </span>
      <span className="block overflow-hidden text-ellipsis">{children}</span>
    </button>
  )
}
