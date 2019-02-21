import axios from 'axios'
import { Toast } from 'antd-mobile'

const Instance = axios.create({
  baseURL: '/',
  timeout: 10000,
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

Instance.interceptors.request.use(
  config => {
    Toast.loading('加载中', 0)
    return config
  },
  error => Promise.reject(error)
)

Instance.interceptors.response.use(
  res => {
    setTimeout(() => {
      Toast.hide()
    }, 300)
    return res.data
  },
  error => Promise.reject(error)
)

export default Instance
