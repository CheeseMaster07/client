import { SET_COORDINATES } from '../constants'


export const getCoordinates = (coordinates) => async (dispatch) => {
  try {

    dispatch({ type: SET_COORDINATES, payload: coordinates });
  } catch (error) {
    console.log(error.message)
  }
}