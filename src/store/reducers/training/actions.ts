import axios from '../../../axios.config'
import { iAddProps, iEditProps } from './actions.interface'
const scriptedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2JlZTc0MDVmZDdiOWYyZjgyMDU0YSIsImVtYWlsIjoiYnVkaWFuZHVrQGdtYWlsLmNvbSIsImlhdCI6MTY0ODI1MzgyN30.XSyC_-JXcm8vnnraYEpTVLRFAT5-tI3p8p-2AMLd9us'

export default class TrainingAction {
  static fetch = (token?: any) => async (dispatch: any, getState: any) => {
    try {
      const { data: { data } } = await axios({
        method: 'GET',
        url: token ? '/admin/class' : '/class',
        headers: {
          Authorization: token && ('Bearer ' + scriptedToken)
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
    try {
      const { data: { data } } = await axios({
        method: 'GET',
        url: token ? ('/admin/class/' + id) : ('/class/' + id),
        headers: {
          Authorization: token && ('Bearer ' + scriptedToken)
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
          Authorization: 'Bearer ' + scriptedToken
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
          Authorization: 'Bearer ' + scriptedToken
        },
        data: payload
      })
      console.log(data, 'data')
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
          Authorization: 'Bearer ' + scriptedToken
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