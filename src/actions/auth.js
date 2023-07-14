import * as api from '../api/index.js'
import { AUTH } from '../constants'

export const login = (formData, navigate, path) => async (dispatch) => {

  try {
    const { data } = await api.login(formData)

    dispatch({ type: AUTH, payload: data })

    if (path) {
      if (path == '/terminal') {
        navigate('/')
        const newTab = window.open(path, '_blank');
        newTab.focus();
      } else {
        navigate(path)
      }
    } else {
      navigate('/')
    }

    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}

export const register = (formData, navigate, path) => async (dispatch) => {

  try {
    const { data } = await api.register(formData)

    dispatch({ type: AUTH, payload: data })

    if (path) {
      if (path == '/terminal') {
        navigate('/')
        const newTab = window.open(path, '_blank');
        newTab.focus();
      } else {
        navigate(path)
      }
    } else {
      navigate('/')
    }

    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}

export const checkTokenExpired = () => async (dispatch) => {

  try {
    const { data } = await api.checkTokenExpired()

    if (data.hasExpired) {
      localStorage.removeItem('profile')
      window.location.reload()
    }

  } catch (error) {
    console.log(error)
  }
}

export const getRecentUser = (user) => async (dispatch) => {

  try {
    const { data } = await api.fetchRecentUser(user)

    const oldUser = JSON.parse(localStorage.getItem('profile')).result.tier

    const profileData = JSON.parse(localStorage.getItem('profile'));
    profileData.result = data;
    localStorage.setItem('profile', JSON.stringify(profileData));

    const newUser = JSON.parse(localStorage.getItem('profile')).result.tier

    console.log(oldUser)
    console.log(newUser)

    if (oldUser != newUser) {
      window.location.reload()
    }


  } catch (error) {
    console.log(error)
  }
}
