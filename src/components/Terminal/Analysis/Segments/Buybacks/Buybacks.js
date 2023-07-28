import React, { useState } from 'react'

import Header from './Header'
import Table_For_Chart from '../../Table_For_Chart'
import Chart from '../../ChartCustom'

export default function Buybacks({ stock }) {

  const [periods, setperiods] = useState('15')
  const [timeframe, setTimeframe] = useState('yearly')
  const [metrics, setMetrics] = useState([
    { id: 'sharesOutstanding', label: 'Shares Outstanding', type: 'main', color: 'rgb(68, 138, 255)', yAxis: 'y1' },
    { id: 'salePurchaseOfStock', label: 'Sale/Purchase of Stock', type: 'main', color: 'rgb(77, 208, 225)', yAxis: 'y4' },
    { id: 'stockBasedCompensation', label: 'Stock Based Compensation', type: 'main', color: 'rgb(138,43,226)', yAxis: 'y4' },
    { id: 'freeCashFlow', label: 'Free Cashflow', type: 'main', color: 'rgb(179, 136, 255)', yAxis: 'y4' },

  ])

  let reports
  let allReports

  let keys
  let lastFiveKeys

  allReports = stock.buybacks[`${timeframe}`]

  keys = Object.keys(allReports);
  lastFiveKeys = keys.slice(0, Number(periods) + (timeframe == 'yearly' ? 1 : 4));
  reports = {};

  for (let key of lastFiveKeys) {
    reports[`${key}-01-01`] = allReports[key];

  }

  console.log(reports)

  return (
    <>
      <div className="statements-header" style={{ boxShadow: '0 2px 6px 1px rgba(0, 0, 0, .25)' }}>

        <Header
          stock={stock}
          reports={reports}
          allReports={allReports}
          periods={periods}
          setperiods={setperiods}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
        />
      </div>

      <Table_For_Chart data={reports} metrics={metrics} timeframe={timeframe} IS={stock.fundamentals.financialStatements.Income_Statement[timeframe]} />
      <Chart metrics={metrics} reports={reports} timeframe={timeframe} />

    </>
  )
}
