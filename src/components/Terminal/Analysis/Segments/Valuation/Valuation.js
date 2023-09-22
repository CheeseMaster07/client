import React, { useEffect, useState } from 'react'


import Header from './Header'
import SubHeader from './SubHeader'

import Content from './Content'

export default function Valuation({ stock }) {
  const [mode, setMode] = useState('multiples')
  const [periods, setperiods] = useState('10')
  const [metrics, setMetrics] = useState([
    { id: 'priceSales', label: 'P/S', color: 'rgb(68, 138, 255)', yAxis: 'y1' },
    { id: 'priceEarnings', label: 'P/E', color: 'rgb(77, 208, 225)', yAxis: 'y2' },
    { id: 'priceBook', label: 'P/B', color: 'rgb(138,43,226)', yAxis: 'y3' },
    { id: 'enterpriceValueEbit', label: 'EV/EBIT', color: 'rgb(68, 138, 255)', yAxis: 'y4' },
    { id: 'enterpriceValueEbit', label: 'EV/EBITDA', color: 'rgb(68, 138, 255)', yAxis: 'y4' },
    { id: 'priceFreeCashflow', label: 'P/FCF', color: 'rgb(251, 192, 45)', yAxis: 'y2' },
    { id: 'marketCap', label: 'Market Cap', color: 'pink', yAxis: 'y6' },
    { id: 'adjusted_close', label: 'Price', color: 'grey', yAxis: 'y5' },

  ])

  let reports
  let allReports

  let keys
  let lastFiveKeys

  switch (mode) {
    case 'multiples':
      allReports = stock.fundamentals.financialStatements.Income_Statement['yearly']
      keys = Object.keys(allReports);
      lastFiveKeys = keys.slice(0, Number(periods));
      reports = {};

      for (const key of lastFiveKeys) {
        reports[key] = allReports[key];
      }


      break;

    case 'dcf':
      allReports = stock.fundamentals.financialStatements.Balance_Sheet['yearly']
      keys = Object.keys(allReports);
      lastFiveKeys = keys.slice(0, Number(periods));
      reports = {};


      for (const key of lastFiveKeys) {
        reports[key] = allReports[key];
      }


      break;

    default:
      break;
  }

  useEffect(() => {
    const numOfReports = Object.keys(allReports).length
    //console.log(mode)
    if (mode == 'multiples') {
      if (numOfReports - 1 >= 10) {
        setperiods('10')
      } else if (numOfReports - 1 >= 5) {
        setperiods('5')

      } else if (numOfReports - 1 >= 3) {
        setperiods('3')

      } else {
        setperiods('1')
      }
    } else {
      //console.log('sd')
      setperiods('10')
    }


  }, [allReports, mode])

  return (
    <>
      <div className="statements-header" style={{ boxShadow: '0 2px 6px 1px rgba(0, 0, 0, .25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0px', width: '350px' }}>
          <img style={{ width: '15%', backgroundColor: 'white', padding: '20px', borderRadius: '', height: '15%', marginLeft: '30px' }} src={`https://eodhistoricaldata.com/${stock.general.LogoURL}`} />
          <h2 className='statements-ticker'>{stock.ticker}</h2>
        </div>
        <Header
          reports={reports}
          allReports={allReports}
          mode={mode}
          setMode={setMode}
          periods={periods}
          setperiods={setperiods}
        />
      </div>
      {mode == 'multiples' ?
        <SubHeader metrics={metrics} />
        :
        ''}
      <Content
        metrics={metrics}
        mode={mode}
        periods={periods}
        reports={reports}
        stock={stock}
      />
    </>

  )

}
