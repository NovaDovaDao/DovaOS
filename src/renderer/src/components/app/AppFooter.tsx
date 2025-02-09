import { ComponentProps } from 'react'
import clsx from 'clsx'

export default function AppFooter({ className, ...props }: ComponentProps<'footer'>): JSX.Element {
  const commitHash = import.meta.env.VITE_APP_COMMIT_HASH ?? 'dev'
  return (
    <footer {...props} className={clsx(className, 'flex px-4 py-2 text-xs justify-between')}>
      <div className="text-[10px] text-neutral-400 font-mono">
        DovaOS Ver. {commitHash.substring(commitHash.length - 6, commitHash.length)}
      </div>
      <nav className="space-x-2">
        {links.map(([label, href], i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noreferrer"
            className=" underline-offset-4 hover:underline"
          >
            {label}
          </a>
        ))}
      </nav>
    </footer>
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
