import * as api from '../api'
import { FETCH_ALL_STOCKS, FETCH_ONE_STOCK, SET_SEARCHED_STOCKS, SET_SEARCHED_STOCKS_LENGTH, SET_SEARCH_QUERY } from '../constants'

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

    //console.log(data)
    dispatch({ type: FETCH_ONE_STOCK, payload: data });
  } catch (error) {
    console.log(error.message)
  }
}

export const setSearchedStocks_action = (searchedStocks) => async (dispatch) => {
  try {
    dispatch({ type: SET_SEARCHED_STOCKS, payload: searchedStocks });
  } catch (error) {
    console.log(error.message)
  }
}

export const setSearchedStocks_length_action = (filteredStocks) => async (dispatch) => {
  try {
    dispatch({ type: SET_SEARCHED_STOCKS_LENGTH, payload: filteredStocks });
  } catch (error) {
    console.log(error.message)
  }
}

export const searchQuery_action = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: SET_SEARCH_QUERY, payload: searchQuery });
  } catch (error) {
    console.log(error.message)
  }
}

