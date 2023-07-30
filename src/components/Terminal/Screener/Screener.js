import React, { useState } from 'react'


import Header from './Header'
import { ok } from './Presets'


export default function Screener() {
  const [preset, setPreset] = useState('valuation')

  return (
    <>
      <div className="statements-header" style={{ boxShadow: '0 2px 6px 1px rgba(0, 0, 0, .25)', padding: '25px 25px' }}>

        <Header
          preset={preset}
          setPreset={setPreset}

        />
      </div>

    </>
  )
}
