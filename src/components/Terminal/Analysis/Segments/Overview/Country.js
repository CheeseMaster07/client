import React from 'react'
import { useNavigate } from 'react-router-dom';

let sizes
if (window.innerWidth < 2000) {
  sizes = {
    titleSize: '28px',
    width: '280px',
    radius: '130px',
    textSize: '18px',
    gap: '0px',
  }
} else {
  sizes = {
    titleSize: '32px',
    width: '365px',
    radius: '160px',
    textSize: '20px',
    gap: '30px',
  }
}


export default function Country() {
  return (
    <div style={{ width: sizes.width, textAlign: 'center' }}>
      <h3 style={{ textAlign: 'center', fontSize: sizes.titleSize, margin: '0', marginBottom: '10px' }}>By Country</h3>
      <div style={{ display: 'flex', gap: sizes.gap, justifyContent: 'space-evenly' }}>
        <div style={{ backgroundColor: 'var(--green-middark)', width: sizes.radius, height: sizes.radius, display: 'inline-block', borderRadius: '100px' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '25px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ height: '20px', width: '20px', backgroundColor: '#448AFF', borderRadius: '2px' }}></div>
            </div>
            <p style={{ fontWeight: '500', fontSize: sizes.textSize, margin: '0' }}>US</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ height: '20px', width: '20px', backgroundColor: '#4DD0E1', borderRadius: '2px' }}></div>
            </div>
            <p style={{ fontWeight: '500', fontSize: sizes.textSize, margin: '0' }}>Europe</p>
          </div>
        </div>
      </div>

    </div>
  )
}
