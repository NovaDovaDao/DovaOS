// src/renderer/src/feature/agents/AgentsList.tsx
import { ComponentProps, useState } from 'react'
import { useAgents } from './useAgents'
import { User, Sparkles, Shield, Star } from 'lucide-react'
import clsx from 'clsx'
import { useAppStore } from '@renderer/stores/app'

export default function AgentList({
  className,
  includeDova,
  ...props
}: ComponentProps<'div'> & { includeDova?: boolean }): JSX.Element {
  const { agents } = useAgents()
  const { setAgentId } = useAppStore()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      {...props}
      className={clsx(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4',
        'w-full max-w-7xl mx-auto',
        className
      )}
    >
      {includeDova && (
        <AgentBtn
          onClick={() => setAgentId(null)}
          isHovered={hoveredIndex === -1}
          onHover={() => setHoveredIndex(-1)}
          onLeave={() => setHoveredIndex(null)}
          isPremium
        >
          Dova
        </AgentBtn>
      )}
      {agents.map((agent, i) => (
        <AgentBtn
          key={agent.id}
          onClick={() => setAgentId(agent.id)}
          isHovered={hoveredIndex === i}
          onHover={() => setHoveredIndex(i)}
          onLeave={() => setHoveredIndex(null)}
          isPremium={i % 3 === 0}
        >
          {agent.name}
        </AgentBtn>
      ))}
    </div>
  )
}

interface AgentBtnProps extends ComponentProps<'button'> {
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  isPremium?: boolean
}

const AgentBtn = ({
  children,
  className,
  isHovered,
  onHover,
  onLeave,
  isPremium,
  ...props
}: AgentBtnProps): JSX.Element => {
  return (
    <button
      {...props}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={clsx(
        'group relative w-full transition-all duration-500',
        'hover:transform hover:scale-[1.02]',
        className
      )}
    >
      {/* Animated background gradient */}
      <div
        className={clsx(
          'absolute inset-0 rounded-2xl transition-opacity duration-500',
          'bg-gradient-to-br from-rose-500/20 via-purple-500/20 to-blue-500/20',
          'group-hover:opacity-100 group-hover:animate-pulse',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Card content container */}
      <div
        className={clsx(
          'relative flex flex-col items-center p-6 rounded-2xl backdrop-blur-sm',
          'border border-white/5 bg-black/40',
          'transition-all duration-500 ease-out',
          'group-hover:border-rose-500/20'
        )}
      >
        {/* Premium indicator */}
        {isPremium && (
          <div className="absolute -top-2 -right-2 flex items-center gap-1">
            <span className="flex h-6 items-center gap-1 rounded-full bg-rose-500/10 px-2 text-[10px] font-medium text-rose-300">
              <Sparkles className="h-3 w-3" />
              PREMIUM
            </span>
          </div>
        )}

        {/* Avatar container with animated border */}
        <div className="relative mb-4">
          <div
            className={clsx(
              'absolute inset-0 rounded-full',
              'bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500',
              'transition-all duration-500 animate-spin-slow blur-md',
              isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
            )}
          />
          <div
            className={clsx(
              'relative w-16 h-16 flex items-center justify-center rounded-full',
              'bg-gradient-to-br from-rose-500/10 to-purple-500/10',
              'transition-all duration-500',
              'group-hover:from-rose-500/20 group-hover:to-purple-500/20'
            )}
          >
            <User className="w-8 h-8 text-white/80 transition-transform duration-500 group-hover:scale-110" />
          </div>
        </div>

        {/* Agent name with gradient text */}
        <span
          className={clsx(
            'min-h-[40px] flex items-center justify-center',
            'px-3 text-center leading-tight',
            'text-sm font-medium transition-all duration-500',
            'bg-gradient-to-r from-rose-200 to-rose-300 bg-clip-text text-transparent',
            'group-hover:from-rose-300 group-hover:to-purple-300'
          )}
        >
          {children}
        </span>

        {/* Status indicators */}
        <div className="mt-4 flex items-center gap-2 text-[10px] text-white/40">
          <Shield className="w-3 h-3" />
          <span>Verified</span>
          <Star className="w-3 h-3 ml-2" />
          <span>5</span>
        </div>

        {/* Hover effect ripple */}
        <div
          className={clsx(
            'absolute inset-0 rounded-2xl transition-opacity duration-500',
            'bg-gradient-to-br from-rose-500/5 via-purple-500/5 to-blue-500/5',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>
    </button>
  )
}
