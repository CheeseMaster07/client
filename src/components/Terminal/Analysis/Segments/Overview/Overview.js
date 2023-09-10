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

  let sizes
  if (window.innerWidth < 2000) {
    sizes = {
      topMagin: '20px',
      gap: '30px',
    }
  } else {
    sizes = {
      topMagin: '35px',
      gap: '50px',
    }
  }

  return (
    <>
      <Header stock={stock} />
      <div style={{ marginTop: sizes.topMagin, display: 'flex', flexDirection: 'column', gap: sizes.gap }}>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <KeyFacts stock={stock} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '45px' }}>
            <Description stock={stock} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly' }}>
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
