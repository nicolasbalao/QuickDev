import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

const httpClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3333',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.request.use(
  (config) => {
    console.info(`[Request] ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('[Request Error]', error)
    return Promise.reject(error)
  },
)

export default httpClient
