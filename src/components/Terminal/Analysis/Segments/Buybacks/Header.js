import React from 'react'

import Button from '../../../Button'

export default function Header({
  stock,
  allReports,
  periods,
  setperiods,
  mode,
  setMode,
  timeframe,
  setTimeframe,

}) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0px', width: `${window.innerWidth < 2000 ? '320px' : '350px'}` }}>
        <img style={{ width: `15%`, backgroundColor: 'white', padding: `${window.innerWidth < 2000 ? '10px' : '20px'}`, borderRadius: '', height: `20%`, marginLeft: '30px' }} src={`https://eodhistoricaldata.com/${stock.general.LogoURL}`} />
        <h2 className='statements-ticker'>{stock.ticker}</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

        <div className="timeframes">
          <div className="yearly-quarterly">

            <Button
              text={'Yearly'}
              type={'yearly-quarterly'}
              name={'yearly'}
              state={timeframe}
              setState={() => setTimeframe('yearly')} />

            <Button
              text={'Quarterly'}
              type={'yearly-quarterly'}
              name={'quarterly'}
              state={timeframe}
              setState={() => setTimeframe('quarterly')} />

          </div>
          <div className="years">
            <Button
              text={
                timeframe == 'yearly'
                  ?
                  '5 years'
                  :
                  '5 quarters'
              }
              type={'periods'}
              name={'5'}
              state={periods}
              setState={() => setperiods('5')}
              timeframe={timeframe}
              numOfReports={Object.keys(allReports).length} />

            <Button
              text={
                timeframe == 'yearly'
                  ?
                  '10 years'
                  :
                  '10 quarters'
              }
              type={'periods'}
              name={'10'}
              state={periods}
              setState={() => setperiods('10')}
              timeframe={timeframe}
              numOfReports={Object.keys(allReports).length} />

            <Button
              text={
                timeframe == 'yearly'
                  ?
                  '15 years'
                  :
                  '15 quarters'
              }
              type={'periods'}
              name={'15'}
              state={periods}
              setState={() => setperiods('15')}
              timeframe={timeframe}
              numOfReports={Object.keys(allReports).length} />

            <Button
              text={
                timeframe == 'yearly'
                  ?
                  '20 years'
                  :
                  '20 quarters'
              }
              type={'periods'}
              name={'20'}
              state={periods}
              setState={() => setperiods('20')}
              timeframe={timeframe}
              numOfReports={Object.keys(allReports).length} />

            <Button
              text={
                timeframe == 'yearly'
                  ?
                  '25 years'
                  :
                  '25 quarters'
              }
              type={'periods'}
              name={'25'}
              state={periods}
              setState={() => setperiods('25')}
              timeframe={timeframe}
              numOfReports={Object.keys(allReports).length} />
          </div>
        </div>
      </div>
    </>

  )
}
