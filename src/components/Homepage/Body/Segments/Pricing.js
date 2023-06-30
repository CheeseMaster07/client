
import React from 'react'

export default function Pricing() {
  return (
    <div className="pricing-container">
      <h2>Pricing</h2>
      <div className="pricing-option">
        <h3>Pro</h3>
        <p>$15</p>
        <p>/month</p>

        <div className="buy-button"></div>
      </div>
      <div className="pricing-option">
        <h3>Premium</h3>
        <p>$20</p>
        <p>/month</p>

        <div className="buy-button"></div>
      </div>
      <div className="pricing-option">
        <h3>Ultimate</h3>
        <p>$50</p>
        <p>/month</p>

        <div className="buy-button"></div>
      </div>
    </div>
  )
}
