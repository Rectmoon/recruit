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
