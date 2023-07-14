import React, { useEffect, useState } from 'react'


import Header from './Header'
import SubHeader from './SubHeader'

import Content from './Content'

export default function Valuation({ stock }) {
  const [mode, setMode] = useState('multiples')
  const [periods, setperiods] = useState('10')
  const [metrics, setMetrics] = useState([])

  useEffect(() => {
    let metricsData = [];


    metricsData = [
      { id: 'p/s', label: 'P/S', color: 'rgb(68, 138, 255)' },
      { id: 'p/e', label: 'P/E', color: 'rgb(68, 138, 255)' },
      { id: 'p/b', label: 'P/B', color: 'rgb(68, 138, 255)' },
      { id: 'ev/ebit', label: 'EV/EBIT', color: 'rgb(68, 138, 255)' },
      { id: 'ev/ebita', label: 'EV/EBITA', color: 'rgb(68, 138, 255)' },
      { id: 'p/fcf', label: 'P/FCF', color: 'rgb(68, 138, 255)' },

      // Add more metrics as needed
    ];



    setMetrics(metricsData);
  }, [mode]);

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
        mode={mode}
        periods={periods}
        reports={reports}
        stock={stock}
      />
    </>

  )

}
