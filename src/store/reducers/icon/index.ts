const init: any = {
  icons: []
}

const reducer = (state = init, action: any) => {
  switch (action.type) {
    case 'SET_ICONS':
      return { ...state, icons: action.payload }
    default:
      return state
  }
}

export default reducer