import { FETCH_ALL_STOCKS, FETCH_ONE_STOCK, SET_SEARCHED_STOCKS } from '../constants.js'

export const stocks = (stocks = [], action) => {
  switch (action.type) {
    case FETCH_ALL_STOCKS:
      return action.payload
    default:
      return stocks
  }
}

export const oneStock = (oneStock = {}, action) => {
  switch (action.type) {
    case FETCH_ONE_STOCK:
      return action.payload
    default:
      return oneStock
  }
}

export const searchedStocks = (searchedStocks = [], action) => {
  switch (action.type) {
    case SET_SEARCHED_STOCKS:
      return action.payload
    default:
      return searchedStocks
  }
}