import * as api from '../api'
import { FETCH_ALL_STOCKS, FETCH_ONE_STOCK } from '../constants'

export const getStocks = () => async (dispatch) => {
  try {

    const { data } = await api.fetchStocks()


    dispatch({ type: FETCH_ALL_STOCKS, payload: data });
  } catch (error) {
    console.log(error.message)
  }
}

export const getOneStock = (ticker) => async (dispatch) => {
  try {

    const { data } = await api.fetchOneStock(ticker)


    dispatch({ type: FETCH_ONE_STOCK, payload: data });
  } catch (error) {
    console.log(error.message)
  }
}