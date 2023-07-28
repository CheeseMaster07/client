import React from 'react'

import Header from './Header'
import Table_For_Data from '../../Table_For_Data'

export default function Management({ stock }) {

  const metrics = [
    { id: 'Title', width: '50%' },
    { id: 'Name', width: '50%' }
  ]

  let reports = stock.general.Officers

  return (
    <>
      <div className="statements-header" style={{ boxShadow: '0 2px 6px 1px rgba(0, 0, 0, .25)' }}>

        <Header
          stock={stock}
        // reports={reports}
        // allReports={allReports}
        // mode={mode}
        // setMode={setMode}
        // periods={periods}
        // setperiods={setperiods}
        />
      </div>
      <Table_For_Data align={'left'} width={'80%'} data={reports} height={15} fontSize={35} metrics={metrics} weight={'bold'} />

    </>

  )
}
