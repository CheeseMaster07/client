import { AUTH } from '../constants'

export default (auth = [], action) => {
  switch (action.type) {
    case AUTH:

      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
      return { ...auth, authData: action?.payload }
    case 'LOGOUT':

      localStorage.clear()
      return { ...auth, authData: null }
    case 'LIKE_STOCK_USER':
      const profileData = JSON.parse(localStorage.getItem('profile'));
      profileData.result = action?.payload;
      localStorage.setItem('profile', JSON.stringify(profileData));
      return { ...auth, authData: action?.payload }
    default:
      return auth
  }
}