import React from 'react'

import TableRow_For_Data from './TableRow_For_Data'
import '../../../css/colors.css'


export default function Table_For_Data({ align, width, data, height, fontSize, metrics, weight }) {

  const fiscalPeriods = []
  const fiscalReports = []

  Object.keys(data).forEach(period => {

    fiscalPeriods.push(period)

    fiscalReports.push(data[`${period}`])
  })

  fiscalPeriods.reverse()
  fiscalReports.reverse()

  function splitCamelCase(input) {
    return input
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Split camel case by inserting a space
      .replace(/(\b[a-z])/g, (match) => match.toUpperCase()); // Capitalize the first letter of each word
  }

  return (
    <div className='statements-table-container' style={{ overflowX: 'auto', maxHeight: '85%', marginTop: '13px' }}>
      <table className='statements-table' style={{ marginTop: '0px', width: width }}>
        <colgroup style={{ width: '2000px' }}>

          {metrics.map(metric => {

            return <col key={metric.id} style={{ width: metric.width, textAlign: 'left' }} />
          })}


        </colgroup>
        <thead style={{
          position: 'sticky',
          top: '-1px',
          zIndex: '2',

        }}>
          {metrics.map((metric) => {

            return (
              <th key={metric}>{splitCamelCase(metric.id)}</th>
            );
          })}
        </thead>
        <tbody>
          {fiscalReports.reverse().map((period) => {
            return (
              <>
                <TableRow_For_Data
                  period={period}
                  height={height}
                  fontSize={fontSize}
                  metrics={metrics}
                  weight={weight}
                  align={align}
                />
              </>
            )
          })}
        </tbody>
      </table>
    </div >
  )
}
