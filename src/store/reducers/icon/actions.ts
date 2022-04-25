import axios from 'axios'

export default class IconAction {
  static fetch = () => async (dispatch: any, getState: any) => {
    try {
      const { data } = await axios({
        method: 'GET',
        url: 'https://api.dsarea.com/icon'
      })
      dispatch({
        type: 'SET_ICONS',
        payload: data
      })
    } catch (error) {
      console.log(error, 'IconAction.fetch error')
    }
  }
}