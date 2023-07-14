import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'


import { stripeTest } from '../../api'

export default function Payment() {
  const navigate = useNavigate()
  return (
    <div>
      <button onClick={async () => {
        const { data } = await stripeTest()
        window.location.replace(data.url)
      }}>Checkout</button>
    </div>
  )
}
