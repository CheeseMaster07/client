import React from 'react'

import '../../../../css/homepage/segments.css'


export default function Pricing() {
  return (
    <div className="pricing-container">
      <h2>Pricing</h2>
      <div className="pricing-options">
        <div className="pricing-option">
          <h3>Pro</h3>
          <p className="price">$15</p>
          <p className="month">/month</p>

          <div className="buy-button">
            Buy
          </div>
        </div>
        <div className="pricing-option">
          <h3>Premium</h3>
          <p className="price">$20</p>
          <p className="month">/month</p>

          <div className="buy-button">
            Buy
          </div>
        </div>
        <div className="pricing-option">
          <h3>Ultimate</h3>
          <p className="price">$50</p>
          <p className="month">/month</p>

          <div className="buy-button">
            Buy
          </div>
        </div>
      </div>
    </div>
  )
}
