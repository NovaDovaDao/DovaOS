import { useState } from 'react'

function AppVersions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions)
  const commitHash = import.meta.env.VITE_APP_COMMIT_HASH ?? '(dev)'

  return (
    <ul className="text-[10px] font-mono text-neutral-600 flex gap-2">
      <li>DovaOS v{commitHash.substring(commitHash.length - 6, commitHash.length)}</li>
      <li>Electron v{versions.electron}</li>
      <li>Chromium v{versions.chrome}</li>
      <li>Node v{versions.node}</li>
    </ul>
  )
}

export default AppVersions
