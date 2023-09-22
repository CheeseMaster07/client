import React, { useState } from 'react'
import { useNavigate, Outlet, Link } from 'react-router-dom'

import '../../css/homepage/header.css'
import '../../css/colors.css'
import { createOrGetUser } from '../../api'

import premiumBackground from '../../logos/premium.jpg'



export default function Header() {
  const navigate = useNavigate()

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  function logout() {
    localStorage.removeItem('profile')
    window.location.reload()
  }

  return (
    <>
      <div className="header">
        <div onClick={() => navigate('/')} className="left-part">
          <h1>Fundamenta</h1>
        </div>
        <div className="center-part">
          <div >
            <h2 >{user ?
              <a style={{ textDecoration: 'none', color: 'white' }} target="_blank" href="/terminal">Terminal</a>
              :
              <Link style={{ textDecoration: 'none', color: 'white' }} to='/auth' state={'/terminal'} >Terminal</Link>
            }</h2>
          </div>
          <div>
            <h2><a style={{ textDecoration: 'none', color: 'white' }} href='/api'>Api</a></h2>
          </div>
          <div>
            <h2><a style={{ textDecoration: 'none', color: 'white' }} href='/pricing'>
              Pricing
            </a></h2>
          </div>
          <div>
            <h2>About</h2>
          </div>
          <div>
            <h2>Contact</h2>
          </div>

        </div>
        <div className="right-part">
          {user ?
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ marginBottom: '3px', fontSize: '25px' }}>{user.result?.name}</h2>
              {user.result?.tier == 'Premium Plan' ?
                <h2 style={{
                  fontSize: '20px',
                  marginTop: '2px',
                  color: `black`,
                  backgroundImage: `url(${premiumBackground})`,
                  backgroundSize: 'cover', // Make the image fit within the div
                  backgroundRepeat: 'no-repeat', // Prevent image repetition
                  display: 'inline-block',
                  padding: '1px 15px',
                  borderRadius: '5px'
                }}>{user.result?.tier.split(' ')[0]}</h2>
                : <h2 style={{
                  fontSize: '20px',
                  marginTop: '2px',
                  color: `black`,
                  backgroundColor: `var(--tier-${user.result?.tier.split(' ')[0].toLowerCase()})`,
                  display: 'inline-block',
                  padding: '1px 15px',
                  borderRadius: '5px'
                }}>{user.result?.tier.split(' ')[0]}</h2>
              }
            </div>

            :
            ''}
          <h2></h2>
          {user ? (
            <h2 onClick={logout}>Logout</h2>
          ) : (
            <h2 onClick={() => {
              navigate('/auth');
            }}>Login</h2>

          )}

        </div>
      </div>
      <Outlet />
    </>

  )
}
