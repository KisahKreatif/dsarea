import axios from '../../../axios.config'
import { iAddProps, iEditProps } from './actions.interface'

export default class TrainingAction {
  static fetch = (token?: any) => async (dispatch: any, getState: any) => {
    const isSuper = localStorage.getItem('isSuper')
    try {
      const { data: { data } } = await axios({
        method: 'GET',
        url: token && isSuper ? '/admin/class' : '/class',
        headers: {
          Authorization: token && ('Bearer ' + token)
        }
      })
      dispatch({
        type: 'SET_CLASSES',
        payload: data.sort((a: any, b: any) => b.updatedAt - a.updatedAt)
      })
    } catch (error) {
      console.log(error, 'TrainingAction.fetch error')
    }
  }

  static fetchPrivate = (token: string) => async (dispatch: any, getState: any) => {
    try {
      const { data: { data } } = await axios({
        method: 'GET',
        url: '/auth/myclass',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      dispatch({
        type: 'SET_PRIVATE_CLASSES',
        payload: data
      })
    } catch (error) {
      console.log(error, 'TrainingAction.fetch error')
    }
  }

  static fetchById = async (id: string, token?: any) => {
    const isSuper = localStorage.getItem('isSuper')
    try {
      const { data: { data } } = await axios({
        method: 'GET',
        url: token && isSuper ? ('/admin/class/' + id) : ('/class/' + id),
        headers: {
          Authorization: token && ('Bearer ' + token)
        }
      })
      return data
    } catch(error) {
      console.log(error, 'TrainingAction.fetchById error')
    }
  }

  static removeByIds = async (ids: string[], token: string) => {
    try {
      const { data: { data } } = await axios({
        method: 'DELETE',
        url: '/admin/class/deletemany',
        headers: {
          Authorization: 'Bearer ' + token
        },
        data: {
          ids
        }
      })
      return data
    } catch (error) {
      console.log(error, 'TrainingAction.removeByIds error')
    }
  }

  static add = (payload: iAddProps, token: string) => async (dispatch: Function, getState: Function) => {
    try {
      const { training: { classes } } = getState()
      const { data: { data } } = await axios({
        method: 'POST',
        url: '/admin/class',
        headers: {
          Authorization: 'Bearer ' + token
        },
        data: payload
      })
      dispatch({
        type: 'SET_CLASSES',
        payload: [...classes, data]
      })
    } catch (error) {
      console.log(error, 'TrainingAction.add Error')
    }
  }

  static edit = (payload: iEditProps, id: string, token: string) => async (dispatch: Function, getState: Function) => {
    try {
      const { training: { classes } } = getState()
      const { data: { data } } = await axios({
        method: 'PATCH',
        url: '/admin/class/update/' + id,
        headers: {
          Authorization: 'Bearer ' + token
        },
        data: payload
      })
      dispatch({
        type: 'SET_CLASSES',
        payload: classes.map((el: any) => el._id === id ? data : el)
      })
    } catch (error: any) {
      console.log(error.data, 'TrainingAction.edit Error')
    }
  }
}