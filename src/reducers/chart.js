import { SET_COORDINATES } from '../constants'

export const setCoordinates = (coordinates = {}, action) => {
  switch (action.type) {
    case SET_COORDINATES:
      return action.payload
    default:
      return coordinates
  }
}