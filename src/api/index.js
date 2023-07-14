import axios from 'axios'
import jwt_decode from 'jwt-decode'

const API = axios.create({ baseURL: 'http://localhost:5000' })

const user = JSON.parse(localStorage.getItem('profile'));

if (user?.token) {
  API.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
} else {

}


export const fetchStocks = () => API.get('/stocks')

export const fetchOneStock = (ticker) => API.get(`/stocks/${ticker}`)

export const fetchRecentUser = (user) => API.get(`/auth/${user._id}`)
export const login = (formData) => API.post('/auth/login', formData)
export const register = (formData) => API.post('/auth/register', formData)
export const checkTokenExpired = () => API.post('/auth/checkTokenExpired')

export const stripeTest = (priceId, userId) => API.post(`/payment`, { id: 'prod_OC8UFzQUD4HTW9', userId: userId, priceId: priceId, quantity: 1 })
export const cancelSubscription = (userId) => API.post(`/payment/cancel`, { userId: userId })

export const getProductAndPrice = (productId, price) => API.get(`/payment?id=${productId}&price=${price}`);