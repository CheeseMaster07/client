import React, { useEffect, useState } from 'react'


import Header from './Header'
import Table_For_Chart from '../../Table_For_Chart'
import Table_For_Data from '../../Table_For_Data'
import Chart from '../../ChartCustom'


export default function Dividends({ stock }) {
  const [mode, setMode] = useState('statistics')
  const [periods, setperiods] = useState('15')
  const [metrics, setMetrics] = useState([
    { id: 'dividendsPerShare', label: 'Dividends Per Share', type: 'main', color: 'rgb(68, 138, 255)', yAxis: 'y1', extraInfo: 'whole' },
    { id: 'dividendsYield', label: 'Dividends Yield', type: 'main', color: 'rgb(77, 208, 225)', yAxis: 'y2', extraInfo: 'precentage' },
    { id: 'payoutRatio', label: 'Payout Ratio', type: 'main', color: 'rgb(138,43,226)', yAxis: 'y3', extraInfo: 'precentage' },
    { id: 'totalDividendsPaid', label: 'Total Dividends Paid', type: 'main', color: 'rgb(179, 136, 255)', yAxis: 'y4' },
    { id: 'freeCashflow', label: 'Free Cashflow', type: 'main', color: 'rgb(251, 192, 45)', yAxis: 'y4' },

  ])

  const historyMetrics = [
    { id: 'exDate' },
    { id: 'declarationDate' },
    { id: 'recordDate' },
    { id: 'paymentDate' },
    { id: 'valueAdjusted' },
    { id: 'valueUnadjusted' },
    { id: 'frequency' },
    { id: 'currency' },

  ]

  let reports
  let allReports

  let keys
  let lastFiveKeys

  if (!stock.dividendsData?.everyOne) {
    return (
      <>
        <div className="statements-header" style={{ boxShadow: '0 2px 6px 1px rgba(0, 0, 0, .25)' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0px', width: `${window.innerWidth < 2000 ? '320px' : '350px'}` }}>
            <img style={{ width: `15%`, backgroundColor: 'white', padding: `${window.innerWidth < 2000 ? '10px' : '20px'}`, borderRadius: '', height: `20%`, marginLeft: '30px' }} src={`https://eodhistoricaldata.com/${stock.general.LogoURL}`} />
            <h2 className='statements-ticker'>{stock.ticker}</h2>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            border: 'solid 3px white',
            borderRadius: '20px',
            padding: '0 80px',
            display: 'inline-block',
            marginTop: '80px'
          }}>
            <p style={{ fontSize: '70px', fontWeight: 'bold' }}>{stock.general.Name} does not pay dividends</p>
          </div>
        </div>

      </>
    )
  }

  const filteredData = {};
  allReports = stock.dividendsData.yearly
  for (const key in allReports) {
    if (key >= new Date().getFullYear() - 25) {
      filteredData[key] = allReports[key];
    }
  }
  allReports = filteredData

  keys = Object.keys(allReports).reverse();
  lastFiveKeys = keys.slice(0, Number(periods) + 1);
  reports = {};

  for (let key of lastFiveKeys) {

    if (Number(key) >= new Date().getFullYear() - Number(periods) - 1) {
      reports[`${key}-01-01`] = allReports[key];

    }
  }

  return (
    <>
      <div className="statements-header" style={{ boxShadow: '0 2px 6px 1px rgba(0, 0, 0, .25)' }}>

        <Header
          stock={stock}
          reports={reports}
          allReports={allReports}
          mode={mode}
          setMode={setMode}
          periods={periods}
          setperiods={setperiods}
        />
      </div>
      {mode == 'statistics' ?
        <>
          <Table_For_Chart data={reports} metrics={metrics} timeframe={'yearly'} IS={stock.fundamentals.financialStatements.Income_Statement[`yearly`]} />
          <Chart metrics={metrics} reports={reports} timeframe={'yearly'} />
        </>
        :
        <Table_For_Data data={stock.dividendsData.everyOne} metrics={historyMetrics} />
      }

    </>
  )
}