import axios from '../../../axios.config'
import { iTransactionProps } from './actions.interface'

export default class TransactionAction {
  static fetchPaid = (token: string) => {
    return axios({
      url: '/sale',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  static charge = (payload: iTransactionProps, token: string) => {
    return axios({
      url: '/sale',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      },
      data: payload
    })
  }

  static chargeVA = (payload: iTransactionProps, token: string) => {
    return axios({
      url: '/sale/VA',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      },
      data: payload
    })
  }

  static fetchById = (id: string, token: string) => {
    return axios({
      url: '/sale/' + id,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }
}