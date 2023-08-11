import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Link, useNavigate } from 'react-router-dom'


import '../../css/terminal/sidebar.css'
import '../../css/colors.css'


import analysis_png from '../../logos/analysis.png'
import screener_png from '../../logos/screener.png'
import arrow_png from '../../logos/arrow.png'


import Stocks from './Stocks/Stocks'


export default function Sidebar({ mode }) {
  const navigate = useNavigate()

  const handleClick = (path) => {
    navigate(`/terminal/${path}`)
  }

  const stocks = useSelector((state) => state.stocks)
  const searchedStocks = useSelector((state) => state.searchedStocks)

  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className='sidebar'>
      <div className='sidebar-top'>
        <input onChange={handleChange} className='sidebar-searchbar' type='text' placeholder='Search...' />
        <div className='analysis-screener'>
          <div style={mode == 'analysis' ? { backgroundColor: 'var(--green-light)' } : {}} onClick={() => handleClick('analysis')} className='analysis'>
            <img className='analysis-logo' src={analysis_png} />
            <p>Analysis</p>
          </div>
          <div style={mode == 'screener' ? { backgroundColor: 'var(--green-light)' } : {}} onClick={() => handleClick('screener')} className='screener'>
            <img className='screener-logo' src={screener_png} />
            <p>Screener</p>
          </div>
        </div>
        <div className='watchlist-button'>Watchlists</div>
        <div className='query-results'>{searchedStocks.length}/{stocks.length}</div>
        <div className='arrow-bar'>
          <img className='arrow' src={arrow_png} />
        </div>
      </div>
      <div style={window.location.pathname.includes('screener') ? { zIndex: '-1' } : {}} className='sidebar-middle'>
        <Stocks searchQuery={searchQuery.toUpperCase()} />
      </div>
      <div className='sidebar-bottom'></div>

    </div>

  )
}
