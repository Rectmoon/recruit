import axios from 'axios'
import { Toast } from 'antd-mobile'

const Instance = axios.create({
  baseURL: '/',
  timeout: 10000,
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

Instance.interceptors.request.use(
  config => {
    Toast.loading('加载中', 0)
    return config
  },
  error => {
    Toast.fail('请求超时，请联系管理员')
    return Promise.reject(error)
  }
)

Instance.interceptors.response.use(
  res => {
    switch (res.data.code) {
      case 1:
        Toast.fail(res.data.msg)
        break
      case 0:
      default:
        Toast.hide()
    }
    return res.data
  },
  error => {
    Toast.fail('请求超时，请联系管理员')
    return Promise.reject(error)
  }
)

export default Instance
