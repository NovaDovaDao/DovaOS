import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          // All requests starting with /api will be proxied
          target: 'http://localhost:3000', // Your backend URL
          changeOrigin: true, // Required for CORS to work
          rewrite: (path) => path.replace(/^\/api/, '') // Optional: remove /api prefix
        }
      }
    }
  }
})
