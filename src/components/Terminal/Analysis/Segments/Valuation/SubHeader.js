import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'


import ToggleMetric_part from './ToggleMetric_part'
import { getValuationState } from '../../../../../actions/analysis'


export default function SubHeader({ metrics, setMetrics }) {

  const dispatch = useDispatch()

  const isToggledMetrics_obj = {}


  const autoToggledMetrics = [
    'priceSales',
    'priceEarnings',
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

  useEffect(() => {
    dispatch(getValuationState(isToggledMetrics))

  }, [isToggledMetrics])

  return (
    <div style={{ backgroundColor: 'var(--green-middark)', width: '100%', alignItems: 'center', display: 'flex', gap: '60px' }}>
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
      <div>
        <ToggleMetric_part metric={metrics[metrics.length - 1]} isToggledMetrics={isToggledMetrics} setIsToggledMetrics={setIsToggledMetrics} />
      </div>


    </div>
  )
}
