const init: any = {
  classes: [],
  privateClasses: []
}

const reducer = (state = init, action: any) => {
  switch (action.type) {
    case 'SET_CLASSES':
      return { ...state, classes: action.payload }
    case 'REMOVE_CLASS':
      return { ...state, classes: state.classes.filter((el: any) => el._id !== action.payload._id) }
    case 'SET_PRIVATE_CLASSES':
      return { ...state, privateClasses: action.payload }
    default:
      return state
  }
}
export default reducer