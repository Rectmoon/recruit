import { combineReducers } from 'redux'
import { user } from './user'

function counteReducer(state = 0, action) {
  switch (action.type) {
    case 'ADD_COUNT':
      return state + 1
    case 'DEC_COUNT':
      return state - 1
    default:
      return state
  }
}

export default combineReducers({ counter: counteReducer, user })
