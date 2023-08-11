import React from 'react'

import Button from '../Button'

import '../../../css/terminal/segments/statements.css'

export default function Header({ preset, setPreset, customize, setCustomize }) {
  return (
    <>
      <div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

          <div className="modes">
            <Button
              text={'Customize'}
              type={'preset'}
              name={'custom'}
              state={customize}
              setState={() => setCustomize(!customize)}
            />

            <Button
              text={'Valuation'}
              type={'preset'}
              name={'valuation'}
              state={preset}
              setState={() => setPreset('valuation')} />

            <Button
              text={'Growth'}
              type={'preset'}
              name={'growth'}
              state={preset}
              setState={() => setPreset('growth')} />

            <Button
              text={'Momentum'}
              type={'preset'}
              name={'momentum'}
              state={preset}
              setState={() => setPreset('momentum')} />

            <Button
              text={'Dividends'}
              type={'preset'}
              name={'dividends'}
              state={preset}
              setState={() => setPreset('dividends')} />

            <Button
              text={'Buybacks'}
              type={'preset'}
              name={'buybacks'}
              state={preset}
              setState={() => setPreset('buybacks')} />

            {/* <Button
              text={'Forecast'}
              type={'preset'}
              name={'forecast'}
              state={preset}
              setState={() => setPreset('forecast')} /> */}

            <Button
              text={'Financial Stability'}
              type={'preset'}
              name={'financialStability'}
              state={preset}
              setState={() => setPreset('financialStability')} />

          </div>

          {/* <div className="years">

            <Button
              text={'5 year'}
              type={'periods'}
              name={'5'}
              state={periods}
              setState={() => setperiods('5')}
              numOfReports={Object.keys(allReports).length}
              segment={'dividends'}
            />

            <Button
              text={'10 years'}
              type={'periods'}
              name={'10'}
              state={periods}
              setState={() => setperiods('10')}
              numOfReports={Object.keys(allReports).length}
              segment={'dividends'}
            />

            <Button
              text={'15 years'}
              type={'periods'}
              name={'15'}
              state={periods}
              setState={() => setperiods('15')}
              numOfReports={Object.keys(allReports).length}
              segment={'dividends'}
            />

            <Button
              text={'20 years'}
              type={'periods'}
              name={'20'}
              state={periods}
              setState={() => setperiods('20')}
              numOfReports={Object.keys(allReports).length}
              segment={'dividends'}
            />

            <Button
              text={'25 years'}
              type={'periods'}
              name={'25'}
              state={periods}
              setState={() => setperiods('25')}
              numOfReports={Object.keys(allReports).length}
              segment={'dividends'}
            />
          </div> */}




        </div>
      </div>
    </>
  )
}
