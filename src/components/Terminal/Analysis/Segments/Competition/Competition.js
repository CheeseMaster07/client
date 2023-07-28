import React, { useState } from 'react'

import Header from './Header'
import Table_For_Data from '../../Table_For_Data'

export default function Competition({ stock }) {
  const [mode, setMode] = useState('list')

  const metrics = [
    { id: 'ticker', width: '5%' },
    { id: 'name', width: '20%' },
    { id: 'marketCap', width: '7.5%' },
    { id: 'sharePrice', width: '7.5%' },
    { id: 'growth', width: '7.5%' },
    { id: 'trailingPE', width: '7.5%' },
    { id: 'forwardPE', width: '7.5%' },
    { id: 'PS', width: '7.5%' },
    { id: 'dividendsYield', width: '7.5%' },
    { id: 'netMargin', width: '7.5%' },
    { id: 'ROE', width: '7.5%' },
    { id: 'precentShort', width: '7.5%' },
  ]

  let reports = stock.competition
  console.log(reports)


  return (
    <>
      <div className="statements-header" style={{ boxShadow: '0 2px 6px 1px rgba(0, 0, 0, .25)' }}>

        <Header
          stock={stock}
          // reports={reports}
          // allReports={allReports}
          mode={mode}
          setMode={setMode}
        // periods={periods}
        // setperiods={setperiods}
        />
      </div>
      <Table_For_Data align={'center'} width={'95%'} data={reports} height={6} fontSize={25} metrics={metrics} weight={'400'} />
    </>
  )
}
