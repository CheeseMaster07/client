import React from 'react'

export default function Header({ stock }) {
  return (
    <div className="statements-header" style={{ boxShadow: '0 2px 6px 1px rgba(0, 0, 0, .25)', height: '90px' }} >

      <div style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
        <img style={{ width: `10%`, backgroundColor: 'white', padding: `${window.innerWidth < 2000 ? '10px' : '20px'}`, borderRadius: '4px', height: `20%`, marginLeft: '30px' }} src={`https://eodhistoricaldata.com/${stock.general.LogoURL}`} />
        <h2 className='statements-ticker'>{stock.general.Name}</h2>
      </div>
    </div>
  )
}
