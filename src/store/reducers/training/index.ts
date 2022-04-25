const init: any = {
  classes: []
}

const reducer = (state = init, action: any) => {
  switch (action.type) {
    case 'SET_CLASSES':
      return { ...state, classes: action.payload }
    case 'REMOVE_CLASS':
      return { ...state, classes: state.classes.filter((el: any) => el._id !== action.payload._id) }
    default:
      return state
  }
}
export default reducer