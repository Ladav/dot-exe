import axios from 'axios'
import { QueryClient } from 'react-query'
import { API_BASE_URL } from './env'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
})

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
})
