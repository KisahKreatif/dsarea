const init: any = {
  classes: [],
  read: false
}

const reducer = (state = init, action: any) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, classes: action.payload }
    case 'SET_CART_READ':
      return { ...state, read: action.payload }
    default:
      return state
  }
}

export default reducer