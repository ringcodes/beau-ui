import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { message } from 'ant-design-vue';

import {
  ACCESS_TOKEN
} from '@/store/mutation-types'

// 创建 axios 实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api base_url
  timeout: 6000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      message.error(data.msg);
    }
    if (error.response.status === 401) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      store.dispatch('Logout');
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['Authorization'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
request.interceptors.response.use((response) => {
  return response.data
}, err)

export {
  request
}
