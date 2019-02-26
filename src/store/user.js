import { registerApi, loginApi, updateUserInfoApi } from '@/api/user'
import { getRedirectPath } from '@/utils/redirect'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  redirectTo: '',
  isAuth: false,
  user: {
    avatar: 'boy',
    desc: ''
  },
  msg: ''
}

const errorMsg = msg => ({ msg, type: ERROR_MSG })
const authSuccess = o => {
  const { password, ...data } = o
  return { type: AUTH_SUCCESS, payload: data }
}
export const loadData = d => {
  return { type: LOAD_DATA, payload: d }
}

export const updateUserInfo = d => {
  return dispatch => {
    updateUserInfoApi(d).then(res => {
      if (res.code == 0 && res.data) return dispatch(authSuccess(res.data))
      dispatch(errorMsg(res.msg))
    })
  }
}

export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        user: { ...action.payload }
      }
    case ERROR_MSG:
      return { ...state, msg: action.msg, isAuth: false }
    case LOAD_DATA:
      return { ...state, isAuth: true, user: { ...action.payload } }
    case LOGOUT:
      return { ...initState, redirectTo: '/login' }
    default:
      return state
  }
}

export function register({ username, password, repeatPassword, type }) {
  if (!username || !password) return errorMsg('用户名密码必须输入')
  if (password !== repeatPassword) return errorMsg('密码和确认密码不同')
  return dispatch => {
    registerApi({ username, password, type }).then(res => {
      if (res.code == 0 && res.data) return dispatch(authSuccess(res.data))
      dispatch(errorMsg(res.msg))
    })
  }
}

export function login({ username, password }) {
  if (!username || !password) return errorMsg('用户名密码必须输入')
  return dispatch => {
    loginApi({ username, password }).then(res => {
      if (res.code == 0 && res.data) return dispatch(authSuccess(res.data))
      dispatch(errorMsg(res.msg))
    })
  }
}

export function logout() {
  return { type: LOGOUT }
}
