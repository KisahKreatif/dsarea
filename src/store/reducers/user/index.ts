const init = {
  profile: null
}

const reducer = (state = init, action: any) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.payload }
    default:
      return state
  }
}

export default reducer