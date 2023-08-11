import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getStocks, setSearchedStocks_action } from '../../../actions/stocks'

import '../../../css/terminal/stockBar.css'


import Stock from './Stock'

export default function Stocks({ searchQuery, type }) {
  const dispatch = useDispatch()

  const stocks = useSelector((state) => state.stocks)

  const [searchedStocks, setSearchedStocks] = useState(stocks)

  useEffect(() => {
    dispatch(getStocks())
    //dispatch(setSearchedStocks_action(stocks))
  }, [])

  useEffect(() => {
    if (type != 'homepage') {
      setSearchedStocks(stocks)

    }
  }, [stocks])

  useEffect(() => {
    dispatch(setSearchedStocks_action(searchedStocks))
  }, [searchedStocks])


  useEffect(() => {

    if (type == 'homepage') {
      setSearchedStocks(stocks
        .filter(stock => stock.general?.Name && stock?.ticker)
        .filter(stock => stock.general.Name.toLowerCase().startsWith(searchQuery.toLowerCase()) || stock.ticker.toLowerCase().startsWith(searchQuery.toLowerCase())).slice(0, 10))
      if (searchQuery.length == 0) {
        setSearchedStocks('')
      }
    } else {
      setSearchedStocks(stocks
        .filter(stock => stock.general?.Name && stock?.ticker)
        .filter(stock => stock.general.Name.toLowerCase().startsWith(searchQuery.toLowerCase()) || stock.ticker.toLowerCase().startsWith(searchQuery.toLowerCase())))
    }


  }, [searchQuery, dispatch])


  if (searchedStocks) {
    return (
      <div className={type == 'homepage' ? 'homepage-stocks' : 'stocks'}>
        {searchedStocks.sort((a, b) => {
          if (a.ticker < b.ticker) return -1;
          if (a.ticker > b.ticker) return 1;
          return 0;
        }).map((stock, index) => {
          return <Stock stock={stock} index={index} type={type} key={stock._id} />
        })}
      </div>
    )
  }

}
