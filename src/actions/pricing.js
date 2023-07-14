import { MONTHLY_ANNUALLY } from '../constants'

export const getMonthlyAnnually = (monthly_annually) => async (dispatch) => {
  try {

    dispatch({ type: MONTHLY_ANNUALLY, payload: monthly_annually });
  } catch (error) {
    console.log(error.message)
  }
}