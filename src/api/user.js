import { fetch, post } from './common'

export const getUserInfo = () => fetch('/user/info')

export const registerIn = params => post('/user/register', params)
