import React, { useState } from 'react'


import Header from './Header'
import Table_For_Data from '../../Table_For_Data'

export default function SecFilings({ stock }) {
  const [mode, setMode] = useState('all')

  const metrics = [
    { id: 'date', width: '15%' },
    { id: 'type', width: '10%' },
    { id: 'Link', width: '75%', link: 'secLink' },
  ]

  let reports

  switch (mode) {
    case 'all':
      reports = stock.secFilings.allFilings
      break;
    case '10-K':
      reports = stock.secFilings['10-K']
      break;
    case '10-Q':
      reports = stock.secFilings['10-Q']
      break;
    case '8-K':
      reports = stock.secFilings['8-K']
      break;

    default:
      break;
  }

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
      <Table_For_Data align={'left'} width={'95%'} data={reports} height={5} fontSize={25} metrics={metrics} weight={'400'} />
    </>
  )
}
