import io from 'socket.io-client'
import { getmsglistApi } from '@/api/user'

const socket = io('ws://localhost:8000')

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
  unread: 0,
  chatmsg: []
}

const msgList = msg => ({ type: MSG_LIST, payload: msg })
const msgRecv = msg => ({ type: MSG_RECV, payload: msg })

export default function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return { ...state, chatmsg: action.payload }
    case MSG_RECV:
      return { ...state, chatmsg: [...state.chatmsg, action.payload] }
    case MSG_READ:
    default:
      return state
  }
}

export function getMsgList() {
  return dispatch => {
    getmsglistApi().then(res => {
      if (res.code == 0 && res.data) {
        dispatch(msgList(res.data.msgs))
      }
    })
  }
}

export function sendMsg({ from, to, msg }) {
  return () => {
    socket.emit('sendingmsg', { from, to, msg })
  }
}

export function recvMsg() {
  return dispatch => {
    socket.on('recivemsg', data => {
      console.log(data)
      dispatch(msgRecv(data))
    })
  }
}
