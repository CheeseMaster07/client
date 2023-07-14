import React, { useState } from 'react'
import { useNavigate, Outlet, Link } from 'react-router-dom'


import '../../../../css/homepage/segments.css'
import terminal_logo from '../../../../logos/terminal.png'

export default function Terminal() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  return (
    <div id="terminal" className="terminal-segments">
      <div className="terminal-text">
        <h2>Terminal</h2>
        <p>
          Out terminal includes a powerful analysis tool, screener,
          and a economic calendar, designed to provide you with the
          insights and information necessaryto make informed investment decisions.
        </p>
        <div className='terminal-button'>
          {user ?
            <a style={{ textDecoration: 'none', color: 'black' }} target="_blank" href="/terminal">Open Terminal</a>
            :
            <Link style={{ textDecoration: 'none', color: 'black' }} to='/auth' state={'/terminal'} >Open Terminal</Link>
          }
        </div>
      </div>
      <div className="terminal-logo">
        <img src={terminal_logo} alt='Terminal Logo' />
      </div>
    </div>
  )
}
