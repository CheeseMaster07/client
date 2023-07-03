import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })


export const fetchStocks = () => API.get('/stocks')

export const fetchOneStock = (ticker) => API.get(`/stocks/${ticker}`)
