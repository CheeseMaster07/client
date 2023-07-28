import React, { useState } from 'react'

import Header from './Header'
import Table_For_Data from '../../Table_For_Data'



export default function Shareholders({ stock }) {
  const [mode, setMode] = useState('institutions')

  const metrics = [
    { id: 'rank', width: '4%' },
    { id: `${mode == 'institutions' ? 'institution' : 'fund'}`, width: '48%' },
    { id: 'shares', width: '24%' },
    { id: 'ownership', width: '24%' },
  ]

  let reports

  if (mode == 'institutions') {
    reports = stock.fundamentals.holders.Institutions
  } else {
    reports = stock.fundamentals.holders.Funds
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
      <Table_For_Data align={'left'} width={'95%'} data={reports} height={10} fontSize={30} metrics={metrics} weight={'bold'} />
    </>
  )
}
