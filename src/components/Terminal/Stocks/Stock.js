import React from 'react'
import { Outlet, Link, useLocation, useNavigate, useParams } from 'react-router-dom'


import '../../../css/terminal/stockBar.css'
import '../../../css/colors.css'

export default function Stock({ stock, index }) {
  const navigate = useNavigate()
  function isOdd(number) {
    return number % 2 !== 0;
  }

  const handleClick = () => {
    navigate(`/terminal/analysis/${stock.ticker}`)
  }

  return (
    <div onClick={handleClick} style={isOdd(index) ? { backgroundColor: 'var(--green-dark)' } : { backgroundColor: 'var(--green-middark)' }} className='stockBar'>
      <p>{stock.ticker}</p>
    </div>
  )
}
