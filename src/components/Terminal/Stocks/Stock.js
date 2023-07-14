import React from 'react'
import { Outlet, Link, useLocation, useNavigate, useParams } from 'react-router-dom'


import '../../../css/terminal/stockBar.css'
import '../../../css/colors.css'

export default function Stock({ stock, index, type }) {
  const navigate = useNavigate()
  function isOdd(number) {
    return number % 2 !== 0;
  }

  const handleClick = () => {
    navigate(`/terminal/analysis/${stock.ticker}`)
  }

  if (type == 'homepage') {
    return (

      <div className='homepage-stockBar' onClick={() => { window.open(`/terminal/analysis/${stock.ticker}`, '_blank') }}>
        <a style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>{stock.general.Name}</a>
      </div>
    )
  } else {
    return (

      <div onClick={handleClick} style={isOdd(index) ? { backgroundColor: 'var(--green-dark)' } : { backgroundColor: 'var(--green-middark)' }} className='stockBar'>
        <p>{stock.ticker}</p>
      </div>
    )
  }

}
