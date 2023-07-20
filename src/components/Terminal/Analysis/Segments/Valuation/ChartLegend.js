import React from 'react'
import { useSelector } from 'react-redux'


export default function ChartLegend({ metrics }) {

  const valuationState = useSelector(state => state.valuationState)

  return (
    <>
      {metrics.map(metric => {
        if (valuationState[metric.id]) {
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