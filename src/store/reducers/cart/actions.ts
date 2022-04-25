import axios from '../../../axios.config'

export default class CartAction {
  static fetch = (token: string) => async (dispatch: any, getState: any) => {
    try {
      const { data: { data } } = await axios({
        method: 'GET',
        url: '/cart',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      dispatch({
        type: 'SET_CART',
        payload: data
      })
    } catch (error) {
      console.log(error, 'CartAction.fetch error')
    }
  }

  static add = (id: string, token: string) => async (dispatch: Function, getState: Function) => {
    try {
      const { cart: { classes: cart }, training: { classes } } = getState()
      await axios({
        method: 'POST',
        url: '/cart',
        headers: {
          Authorization: 'Bearer ' + token
        },
        data: {
          _id: id
        }
      })
      console.log([...cart, classes.find((el: any) => el._id === id)])
      dispatch({
        type: 'SET_CART',
        payload: [...cart, classes.find((el: any) => el._id === id)]
      })
    } catch (error) {
      console.log(error, 'CartAction.add error')
    }
  }

  static remove = (id: string, token: string) => async (dispatch: Function, getState: Function) => {
    try {
      const { cart: { classes } } = getState()
      await axios({
        method: 'DELETE',
        url: '/cart/' + id,
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      dispatch({
        type: 'SET_CART',
        payload: classes.filter((el: any) => el._id !== id)
      })
    } catch (error) {
      console.log(error, 'CartAction.remove error')
    }
  }
}