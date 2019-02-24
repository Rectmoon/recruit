import { fetch, post } from './common'

export const getUserInfo = () => fetch('/user/info')

export const registerApi = params => post('/user/register', params)

export const loginApi = params => post('/user/login', params)

export const updateUserInfoApi = params => post('/user/update', params)
