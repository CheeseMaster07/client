import React, { useEffect } from 'react'

import Header from './Header'
import Table_For_Data from '../../Table_For_Data'

export default function Insider({ stock }) {

  const metrics = [
    { id: 'date' },
    { id: 'transactionDate' },
    { id: 'ownerName' },
    { id: 'ownerTitle' },
    { id: 'transactionType' },
    { id: 'quantity' },
    { id: 'price' },
    { id: 'value' }
  ]

  let reports = stock.fundamentals.insiderTransactions

  const deleteAttributeFromNestedObjects = (mainObject, attributeToDelete) => {
    for (const key in mainObject) {
      if (mainObject.hasOwnProperty(key)) {
        const nestedObject = mainObject[key];
        delete nestedObject[attributeToDelete];
      }
    }
  };

  // deleteAttributeFromNestedObjects(reports, "code");
  // deleteAttributeFromNestedObjects(reports, "exchange");
  // deleteAttributeFromNestedObjects(reports, "reportDate");
  // deleteAttributeFromNestedObjects(reports, "link");
  // deleteAttributeFromNestedObjects(reports, "ownerRelationship");
  // deleteAttributeFromNestedObjects(reports, "ownerCik");



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
      <Table_For_Data data={reports} height={10} fontSize={25} metrics={metrics} />

    </>
  )
}
