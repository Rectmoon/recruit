export function counter(state = 0, action) {
  switch (action.type) {
    case 'ADD_COUNT':
      return state + 1
    case 'DEC_COUNT':
      return state - 1
    default:
      return state
  }
}

export function addCount() {
  return { type: 'ADD_COUNT' }
}

export function decCount() {
  return { type: 'DEC_COUNT' }
}

export function addCountAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(addCount())
    }, 300)
  }
}
