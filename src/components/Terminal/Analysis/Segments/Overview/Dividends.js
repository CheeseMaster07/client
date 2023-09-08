import React from 'react'

export default function Dividends() {
  return (
    <div style={{ width: '1150px', height: '420px', textAlign: 'center' }}>
      <h3 style={{ textAlign: 'center', fontSize: '34px', margin: '0', marginBottom: '16px' }}>Dividends</h3>
      <div style={{ backgroundColor: 'var(--green-middark)', width: '96%', height: '88%', display: 'inline-block', borderRadius: '10px' }}></div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '90px', marginTop: '10px' }}>
        <div style={{ textAlign: 'center', width: '210px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ height: '20px', width: '20px', backgroundColor: '#448AFF', borderRadius: '2px' }}></div>
            </div>
            <p style={{ fontWeight: '500', fontSize: '20px', margin: '0' }}>Dividends per Share</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', width: '210px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ height: '20px', width: '20px', backgroundColor: '#4DD0E1', borderRadius: '2px' }}></div>
            </div>
            <p style={{ fontWeight: '500', fontSize: '20px', margin: '0' }}>Dividends Yield (%)</p>
          </div>
        </div>

      </div>

    </div>
  )
}
