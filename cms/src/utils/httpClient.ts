import axios from 'axios'
import { API_URL } from 'config/url.constant'

axios.interceptors.request.use(async (config) => {
  config.url = [API_URL, config.url].join('')
  // config.headers = { Authorization: `Bearer ${userToken}` }
  config.timeout = 700000 // 70 Second
  return config
})

axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    return Promise.reject(error)
  }
)

export const httpClient = axios
