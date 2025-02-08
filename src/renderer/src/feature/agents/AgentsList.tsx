import { ComponentProps, useState } from 'react'
import { Radio, RadioGroup } from '@headlessui/react'
import { useAgents } from './useAgents'
import { CheckCircle } from 'lucide-react'
import clsx from 'clsx'

export default function AgentList({ className, ...props }: ComponentProps<'div'>): JSX.Element {
  const { agents } = useAgents()
  const [selected, setSelected] = useState(agents[0]?.id)

  return (
    <div {...props} className={clsx(className, '')}>
      <RadioGroup
        by="name"
        value={selected}
        onChange={setSelected}
        aria-label="Server size"
        className="space-y-2"
      >
        {agents.map((agent) => (
          <Radio
            key={agent.id}
            value={agent.id}
            className="group relative flex cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-white shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
          >
            <div className="flex w-full items-center justify-between">
              <div className="text-sm/6">
                <p className="font-semibold text-white">{agent.name}</p>
                <div className="flex gap-2 text-white/50">
                  <div>{agent.name}</div>
                  <div aria-hidden="true">&middot;</div>
                </div>
              </div>
              <CheckCircle className="size-6 fill-white opacity-0 transition group-data-[checked]:opacity-100" />
            </div>
          </Radio>
        ))}
      </RadioGroup>
    </div>
  )
}
