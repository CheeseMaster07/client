import React, { useEffect, useState } from 'react'

import ToggleMetric_part from './ToggleMetric_part'

export default function SubHeader({ metrics, setMetrics }) {

  const isToggledMetrics_obj = {}


  const autoToggledMetrics = [
    'p/s'
  ]

  metrics.forEach(metric => {
    if (autoToggledMetrics.includes(metric.id)) {
      isToggledMetrics_obj[metric.id] = true
    } else {
      isToggledMetrics_obj[metric.id] = false

    }
  })

  const [isToggledMetrics, setIsToggledMetrics] = useState(isToggledMetrics_obj)

  useEffect(() => {
    setIsToggledMetrics(isToggledMetrics_obj)

  }, [metrics])
  console.log(isToggledMetrics)

  return (
    <div style={{ backgroundColor: 'var(--green-middark)', width: '100%', alignItems: 'center', display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '40%', gap: '20px', padding: '25px 0', marginLeft: '350px' }}>
        <div className='upperRow' style={{ display: 'flex', justifyContent: 'space-between' }}>
          {metrics.slice(0, 3).map(metric => {

            return <div style={{ width: '100px' }}>
              <ToggleMetric_part metric={metric} isToggledMetrics={isToggledMetrics} setIsToggledMetrics={setIsToggledMetrics} />
            </div>
          })}

        </div>
        <div className='lowerRow' style={{ display: 'flex', justifyContent: 'space-between' }}>
          {metrics.slice(3, 6).map(metric => {

            return <div style={{ width: '100px' }}>
              <ToggleMetric_part metric={metric} isToggledMetrics={isToggledMetrics} setIsToggledMetrics={setIsToggledMetrics} />
            </div>
          })}

        </div>
      </div>


    </div>
  )
}
