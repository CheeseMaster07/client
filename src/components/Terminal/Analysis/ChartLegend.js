import React from 'react'
import { useSelector } from 'react-redux'


export default function ChartLegend({ metrics }) {

  const tableState = useSelector(state => state.tableState)

  return (
    <>
      {metrics.map(metric => {
        if (tableState[metric.id]) {
          return <div className="chart-legend-segment">
            <div style={{ backgroundColor: metric.color }} className='legend-color-bar'></div>
            {metric.label}
          </div>
        }

      })}
    </>

  )

}

{/* <div className="chart-legend-segment">
d
</div> */}