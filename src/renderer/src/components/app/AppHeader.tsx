import { ArrowRight } from 'lucide-react'
import AppLogo from './AppLogo'
import clsx from 'clsx'
import { ComponentProps } from 'react'
import AgentList from '@renderer/feature/agents/AgentsList'

export default function AppHeader({ className, ...props }: ComponentProps<'header'>): JSX.Element {
  const commitHash = import.meta.env.VITE_APP_COMMIT_HASH ?? 'dev'

  return (
    <header {...props} className={clsx('h-full flex flex-col', className)}>
      <div className="space-y-2 mb-4">
        <AppLogo />
        <h2 className="text-sm">AI Agent Builder</h2>
      </div>
      <AgentList className="flex-1" />
      <div>
        {links.map(([label, href], i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            className="flex gap-2 group items-center"
            rel="noreferrer"
          >
            {label}{' '}
            <ArrowRight
              size={12}
              className="transition text-neutral-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:text-current"
            />
          </a>
        ))}
      </div>
      <hr className="my-4 border-neutral-600" />
      <div className="text-[10px] text-neutral-400 font-mono">
        Ver. {commitHash.substring(commitHash.length - 6, commitHash.length)}
      </div>
    </header>
  )
}

const links = [
  ['Discord', 'https://discord.gg/GPt44bGqqR'],
  ['Telegram', 'https://t.me/+WsS1KasVMPhjYTcx'],
  ['Twitter', 'https://x.com/nova_dova_dao?s=21&amp;t=ZbFHk49cdIpDiDCtajTlug'],
  ['DAO', 'https://app.realms.today/dao/9C4iKuh92M45gSCRmDCSBYsdieK8TwiTvjFQohz8iMH9'],
  ['DEX', 'https://dexscreener.com/solana/3i8wmd25pdifbikjmklelvenjjhim3mfluabcmeofwc2'],
  [
    'Raydium',
    'https://raydium.io/swap/?inputMint=sol&amp;outputMint=8HjiRvPNwFT9jpzAAsYF4rE9y576CKdTkQZXaxibpump'
  ]
]
