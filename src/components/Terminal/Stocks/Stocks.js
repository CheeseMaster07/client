import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getStocks } from '../../../actions/stocks'

import '../../../css/terminal/stockBar.css'


import Stock from './Stock'

export default function Stocks({ searchQuery }) {
  const dispatch = useDispatch()

  const stocks = useSelector((state) => state.stocks)

  const [searchedStocks, setSearchedStocks] = useState(stocks)

  useEffect(() => {
    dispatch(getStocks())
  }, [])


  useEffect(() => {
    setSearchedStocks(stocks.filter(stock => stock.ticker.startsWith(searchQuery)))
  }, [searchQuery, dispatch])

  if (searchedStocks) {
    return (
      <div className='stocks'>
        {searchedStocks.sort((a, b) => {
          if (a.ticker < b.ticker) return -1;
          if (a.ticker > b.ticker) return 1;
          return 0;
        }).map((stock, index) => {
          return <Stock stock={stock} index={index} key={stock._id} />
        })}
      </div>
    )
  }

}
