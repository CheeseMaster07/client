import React from 'react'

import Button from '../../../Button'


export default function Header({ stock, mode, setMode }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0px', width: `${window.innerWidth < 2000 ? '320px' : '350px'}` }}>
        <img style={{ width: `15%`, backgroundColor: 'white', padding: `${window.innerWidth < 2000 ? '10px' : '20px'}`, borderRadius: '', height: `20%`, marginLeft: '30px' }} src={`https://eodhistoricaldata.com/${stock.general.LogoURL}`} />
        <h2 className='statements-ticker'>{stock.ticker}</h2>
      </div>
      <div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

          <div className="modes">
            <Button
              text={'All Filings'}
              type={'mode'}
              name={'all'}
              state={mode}
              setState={() => setMode('all')}
            />

            <Button
              text={'10-K'}
              type={'mode'}
              name={'10-K'}
              state={mode}
              setState={() => setMode('10-K')} />

            <Button
              text={'10-Q'}
              type={'mode'}
              name={'10-Q'}
              state={mode}
              setState={() => setMode('10-Q')} />

            <Button
              text={'8-K'}
              type={'mode'}
              name={'8-K'}
              state={mode}
              setState={() => setMode('8-K')} />

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
