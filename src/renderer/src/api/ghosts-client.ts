import axios from 'axios'

const ghostsClient = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL
})

ghostsClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('privy:token')
    if (token) {
      config.headers['x-ghost-token'] = token.split('"').join('')
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export default ghostsClient
