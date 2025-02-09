import { ComponentProps } from 'react'
import clsx from 'clsx'
import AppVersions from './AppVersions'

export default function AppFooter({ className, ...props }: ComponentProps<'footer'>): JSX.Element {
  return (
    <footer {...props} className={clsx(className, 'flex px-4 py-2 text-xs justify-between')}>
      <AppVersions />
      <nav className="space-x-2">
        {links.map(([label, href], i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noreferrer"
            className=" underline-offset-4 hover:underline text-pink-300/50 hover:text-pink-400 transition-all"
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
