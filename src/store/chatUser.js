import { getUserListApi } from '@/api/user'

const USER_LIST = 'USER_LIST'

const initState = {
  userList: []
}

export function chatUser(state = initState, action) {
  switch (action.type) {
    case USER_LIST:
      return { ...state, userList: action.payload }
    default:
      return state
  }
}

function userList(data) {
  return { type: USER_LIST, payload: data }
}

export function getUserList(type) {
  return dispatch => {
    getUserListApi(type).then(res => {
      if (res.code == 0) dispatch(userList(res.data))
    })
  }
}
