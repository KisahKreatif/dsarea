import axios from '../../../axios.config'
import { iReviewEditProps, iReviewProps } from './actions.interface'
const scriptedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2JlZTc0MDVmZDdiOWYyZjgyMDU0YSIsImVtYWlsIjoiYnVkaWFuZHVrQGdtYWlsLmNvbSIsImlhdCI6MTY1MDcyMzUyMX0.Xj5py8zI5iOnpE2TYerB9vYV_h4PCIB3PUQo9CMfrkY'

export default class ReviewAction {
  static fetch = () => async (dispatch: any, getState: any) => {
    try {
      const { data: { data } } = await axios({
        method: 'GET',
        url: '/testimony',
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + scriptedToken
        }
      })
      dispatch({
        type: 'SET_REVIEWS',
        payload: data
      })
    } catch (error) {
      console.log(error, 'ReviewAction.fetch error')
    }
  }

  static fetchById = async (id: string) => {
    try {
      const { data: { data } } = await axios({
        method: 'GET',
        url: '/testimony/' + id,
        headers: {
          "Authorization": 'Bearer ' + scriptedToken
        }
      })
      return data
    } catch(error) {
      console.log(error, 'TrainingAction.fetchById error')
    }
  }

  static add = (payload: iReviewProps, token: string) => async (dispatch: Function, getState: Function) => {
    try {
      const { review: { testimonies } } = getState()
      const { data: { data } } = await axios({
        method: 'POST',
        url: '/testimony',
        headers: {
          Authorization: 'Bearer ' + scriptedToken
        },
        data: payload
      })
      dispatch({
        type: 'SET_REVIEWS',
        payload: [...testimonies, data]
      })
    } catch (error) {
      console.log(error, 'ReviewAction.add error')
    }
  }

  static edit = (payload: iReviewEditProps, id: string, token: string) => async (dispatch: Function, getState: Function) => {
    try {
      const { review: { testimonies } } = getState()
      const { data: { data } } = await axios({
        method: 'PATCH',
        url: '/testimony/' + id,
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + scriptedToken
        },
        data: payload
      })
      dispatch({
        type: 'SET_REVIEWS',
        payload: testimonies.map((el: any) => el._id === id ? data : el)
      })
    } catch (error) {
      console.log(error, 'ReviewAction.edit error')
    }
  }

  static remove = async (ids: string[], token: string) => {
    try {
      const { data: { data } } = await axios({
        method: 'DELETE',
        url: '/testimony/delete/many',
        headers: {
          Authorization: 'Bearer ' + scriptedToken
        },
        data: {
          ids
        }
      })
      return data
    } catch (error) {
      console.log(error, 'ReviewAction.remove error')
    }
  }
}