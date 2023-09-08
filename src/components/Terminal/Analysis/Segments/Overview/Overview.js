import React from 'react'
import Header from './Header'

import BalanceSheet from './BalanceSheet'
import Country from './Country'
import Description from './Description'
import Dividends from './Dividends'
import GrowthProfitability from './GrowthProfitability'
import KeyFacts from './KeyFacts'
import Ownership from './Ownership'
import Shorts from './Shorts'

export default function Overview({ stock }) {

  return (
    <>
      <Header stock={stock} />
      <div style={{ marginTop: '5px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div style={{ marginTop: '30px', display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <KeyFacts stock={stock} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '45px' }}>
            <Description stock={stock} />
            <div style={{ height: '250px', width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
              <Ownership stock={stock} />
              <Shorts stock={stock} />
              <Country stock={stock} />
            </div>
          </div>
          <BalanceSheet stock={stock} />

        </div>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
          <GrowthProfitability stock={stock} />
          <Dividends stock={stock} />
        </div>

      </div>
    </>

  )
}
