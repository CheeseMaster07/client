import { SET_VALUATION_STATE } from '../constants'

export const valuationState = (valuationState = {}, action) => {
  switch (action.type) {
    case SET_VALUATION_STATE:
      return action.payload
    default:
      return valuationState
  }
}