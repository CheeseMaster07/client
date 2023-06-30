import React from 'react'

import '../../css/header.css'

export default function Header() {
  return (
    <div className="header">
      <div className="left-part">
        <h1>Fundamenta</h1>
      </div>
      <div className="center-part">
        <div>
          <h2>Terminal</h2>
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
