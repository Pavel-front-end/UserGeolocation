import axios from 'axios'
import Cookies from 'js-cookie'
import { extractBaseUrl } from '../utils/extractBaseUrl'

const baseURL = extractBaseUrl()

export const showcaseApi = axios.create({
  baseURL,
})

export type ShowcaseApiResponse<T, U = undefined> = {
  status: string
  data: T
  meta: U
}

showcaseApi.interceptors.request.use((request) => {
  const cookies = Cookies.get('auth')
  const compareUid = Cookies.get('compareUid')
  const auth = cookies ? JSON.parse(cookies) : request.params?.token ? request.params.token : undefined
  if (auth && auth.token) {
    request.headers.Authorization = `Bearer ${auth.token}`
  }
  if (compareUid) {
    request.headers['Compare-Uid'] = `${compareUid}`
  }
  return request
})

showcaseApi.interceptors.response.use(undefined, (error) => {
  // Errors handling
  const message = error.message
  if (message) {
    /*notification.warning({
      message,
    })*/
    console.log(message)
  }
  return Promise.reject(error)
})
