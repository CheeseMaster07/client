import React from 'react'

export default function GrowthProfitability() {
  return (
    <div style={{ width: '1150px', height: '420px', textAlign: 'center' }}>
      <h3 style={{ textAlign: 'center', fontSize: '34px', margin: '0', marginBottom: '16px' }}>Growth & Profitablilty</h3>
      <div style={{ backgroundColor: 'var(--green-middark)', width: '96%', height: '88%', display: 'inline-block', borderRadius: '10px' }}></div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
        <div style={{ textAlign: 'center', width: '190px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ height: '20px', width: '20px', backgroundColor: '#448AFF', borderRadius: '2px' }}></div>
            </div>
            <p style={{ fontWeight: '500', fontSize: '20px', margin: '0' }}>Revenue</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', width: '190px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ height: '20px', width: '20px', backgroundColor: '#4DD0E1', borderRadius: '2px' }}></div>
            </div>
            <p style={{ fontWeight: '500', fontSize: '20px', margin: '0' }}>Net Income</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', width: '190px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ height: '20px', width: '20px', backgroundColor: '#FBC02D', borderRadius: '2px' }}></div>
            </div>
            <p style={{ fontWeight: '500', fontSize: '20px', margin: '0' }}>Profit Margin (%)</p>
          </div>
        </div>
      </div>

    </div>
  )
}
