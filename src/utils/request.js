import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000
})

instance.interceptors.request.use(
  (config) => {
    const token = store.getters.token
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    if (response.data.code == 0) {
      Message.error(response.data.msg)
    }
    return response

    // if (response.data.code === 400) {
    //   Message.error(response.data.msg)
    // }
    // if (response.data.code === 200) {
    //   return response.data.data
    // }
  },
  (error) => {
    return Promise.reject(error)
  }
)

const request = (options) => {
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  return instance(options)
}

export default request
