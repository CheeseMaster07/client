import React from 'react'

export default function Ownership() {
  return (
    <div style={{ width: '365px', textAlign: 'center' }}>
      <h3 style={{ textAlign: 'center', fontSize: '32px', margin: '0', marginBottom: '10px' }}>Ownership</h3>
      <div style={{ display: 'flex', gap: '30px' }}>
        <div style={{ backgroundColor: 'var(--green-middark)', width: '160px', height: '160px', display: 'inline-block', borderRadius: '100px' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '25px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ height: '20px', width: '20px', backgroundColor: '#448AFF', borderRadius: '2px' }}></div>
            </div>
            <p style={{ fontWeight: '500', fontSize: '20px', margin: '0' }}>% Retail</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ height: '20px', width: '20px', backgroundColor: '#4DD0E1', borderRadius: '2px' }}></div>
            </div>
            <p style={{ fontWeight: '500', fontSize: '20px', margin: '0' }}>% Institutional</p>
          </div>
        </div>
      </div>

    </div>
  )
}
