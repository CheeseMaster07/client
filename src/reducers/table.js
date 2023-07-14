import { SET_TABLE_STATE } from '../constants'

export const tableState = (tableState = {}, action) => {
  switch (action.type) {
    case SET_TABLE_STATE:
      return action.payload
    default:
      return tableState
  }
}