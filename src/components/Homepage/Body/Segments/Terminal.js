import React from 'react'

import '../../../../css/homepage/segments.css'
import terminal_logo from '../../../../logos/terminal.png'

export default function Terminal() {
  return (
    <div className="terminal-segments">
      <div className="terminal-text">
        <h2>Terminal</h2>
        <p>
          Out terminal includes a powerful analysis tool, screener,
          and a economic calendar, designed to provide you with the
          insights and information necessaryto make informed investment decisions.
        </p>
        <div className='terminal-button'>
          Open Terminal
        </div>
      </div>
      <div className="terminal-logo">
        <img src={terminal_logo} alt='Terminal Logo' />
      </div>
    </div>
  )
}
