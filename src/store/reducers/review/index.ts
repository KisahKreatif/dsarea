const init = {
  testimonies: []
}

const reducer = (state = init, action: any) => {
  switch (action.type) {
    case 'SET_REVIEWS':
      return { ...state, testimonies: action.payload }
    case 'REMOVE_REVIEW':
      return { ...state, testimonies: state.testimonies.filter((el: any) => el._id !== action.payload._id) }
    default:
      return state
  }
}

export default reducer