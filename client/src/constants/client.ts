import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import toast from 'react-hot-toast'
import { QueryClient } from 'react-query'
import { API_BASE_URL } from './env'
import { extractErrorMessage } from '../utils/error.utils'

// initializing react-query client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
})

// initializing axios client
const controller = new AbortController()

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  signal: controller.signal,
})

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const access_token = localStorage.getItem('access_token')
  if (access_token) {
    config.headers = {
      Authorization: `Bearer ${access_token}`,
      ...config.headers,
    }
  }
  return config
}

const onResponse = (response: AxiosResponse): AxiosResponse => response

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  // display error message
  toast.error(extractErrorMessage(error))

  // logout user by forcing a refetch of user profile
  if (error.response?.status === 401) {
    controller.abort()
    window.location.reload()
  }
  return Promise.reject(error)
}

function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}
setupInterceptorsTo(apiClient)
