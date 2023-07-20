import { SET_VALUATION_STATE } from '../constants'

export const getValuationState = (toggledMetrics) => async (dispatch) => {
  try {

    dispatch({ type: SET_VALUATION_STATE, payload: toggledMetrics });
  } catch (error) {
    console.log(error.message)
  }
}
