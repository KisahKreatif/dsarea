import axios from '../../../axios.config'

export default class UserAction {
  static login = (token: string | null) => (dispatch: any, getState: any) => {
    return axios({
      method: 'GET',
      url: '/auth/user',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ token }`
      }
    }).then(res => {
      if (res.data.role === 'admin')
        localStorage.setItem('isSuper', '1')
      dispatch({
        type: 'SET_PROFILE',
        payload: res.data
      })
      return 'Success'
    }).catch(error => {
      console.log(error, 'UserAction.login error')
    })
  }
}