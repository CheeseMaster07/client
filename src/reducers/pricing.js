import { MONTHLY_ANNUALLY } from '../constants.js'

export const monthlyAnnually = (monthlyAnnually = 'monthly', action) => {
  switch (action.type) {
    case MONTHLY_ANNUALLY:
      return action.payload
    default:
      return monthlyAnnually
  }
}
