import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Dividends({ stock }) {
  const navigate = useNavigate()

  let sizes
  if (window.innerWidth < 2000) {
    sizes = {
      titleSize: '30px',
      titleMargin: '12px',
      height: '250px',
      boxWidth: '92%',
      textSize: '18px',

    }
  } else {
    sizes = {
      titleSize: '34px',
      titleMargin: '12px',
      height: '420px',
      boxWidth: '96%',
      textSize: '20px',

    }
  }

  return (
    <div style={{ width: '1150px', height: sizes.height, textAlign: 'center' }}>
      <h3 style={{ textAlign: 'center', fontSize: sizes.titleSize, margin: '0', marginBottom: sizes.titleMargin }}>Dividends</h3>
      <div style={{ backgroundColor: 'var(--green-middark)', width: sizes.boxWidth, height: '88%', display: 'inline-block', borderRadius: '10px', cursor: 'pointer' }} onClick={() => navigate(`/terminal/analysis/${stock.ticker}/dividends`)}></div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '90px', marginTop: '10px' }}>
        <div style={{ textAlign: 'center', width: '210px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ height: '20px', width: '20px', backgroundColor: '#448AFF', borderRadius: '2px' }}></div>
            </div>
            <p style={{ fontWeight: '500', fontSize: sizes.textSize, margin: '0' }}>Dividends per Share</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', width: '210px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ height: '20px', width: '20px', backgroundColor: '#4DD0E1', borderRadius: '2px' }}></div>
            </div>
            <p style={{ fontWeight: '500', fontSize: sizes.textSize, margin: '0' }}>Dividends Yield (%)</p>
          </div>
        </div>

      </div>

    </div>
  )
}
