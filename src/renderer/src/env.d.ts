/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_APP_COMMIT_HASH: string
  readonly VITE_REST_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
