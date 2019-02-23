import { registerIn } from '@/api/user'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  user: {},
  msg: ''
}

const errorMsg = msg => ({ msg, type: ERROR_MSG })
const authSuccess = o => {
  const { password, ...data } = o
  return { type: AUTH_SUCCESS, payload: data }
}

export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, msg: '', ...action.payload }
    case ERROR_MSG:
      return { ...state, msg: action.msg, isAuth: false }
    default:
      return state
  }
}

export function register({ username, password, repeatPassword, type }) {
  if (!username || !password) return errorMsg('用户名密码必须输入')
  if (password !== repeatPassword) return errorMsg('密码和确认密码不同')
  return dispatch => {
    registerIn({ username, password, type }).then(res => {
      if (res.code == 0 && res.data) return dispatch(authSuccess(res.data))
      dispatch(errorMsg(res.msg))
    })
  }
}
