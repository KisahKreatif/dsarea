import axios from 'axios'

export default axios.create({
  baseURL: 'https://api.dsarea.com/api'
  // baseURL: 'http://localhost:5200/api'
})