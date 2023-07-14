import { SET_TABLE_STATE } from '../constants'

export const getTableState = (toggledMetrics) => async (dispatch) => {
  try {


    dispatch({ type: SET_TABLE_STATE, payload: toggledMetrics });
  } catch (error) {
    console.log(error.message)
  }
}
