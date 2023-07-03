import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import '../../css/homepage/header.css'

export default function Header() {
  const navigate = useNavigate()

  return (
    <div className="header">
      <div className="left-part">
        <h1>Fundamenta</h1>
      </div>
      <div className="center-part">
        <div >
          <h2 ><a style={{ textDecoration: 'none', color: 'white' }} target="_blank" href="/terminal">Terminal</a></h2>
        </div>
        <div>
          <h2>Api</h2>
        </div>
        <div>
          <h2>Pricing</h2>
        </div>
        <div>
          <h2>Contact</h2>
        </div>
        <div>
          <h2>About</h2>
        </div>
      </div>
      <div className="right-part">
        <h2>Login</h2>
      </div>
    </div>
  )
}
