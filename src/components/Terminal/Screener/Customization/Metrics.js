import React, { useState, useEffect } from 'react'
import { categories } from '../Categories'


export default function Metrics({ category, presetList }) {
  const categoryObj = categories[category]
  // console.log(categoryObj)
  // console.log(presetList)

  const isToggledMetrics_obj = {}
  const sliceArray = []

  Object.keys(categoryObj).forEach(metric => {
    if (presetList.filter(listMetric => listMetric.id == metric)[0])
      isToggledMetrics_obj[metric] = true
    else {
      isToggledMetrics_obj[metric] = false

    }
  })

  const [isToggledMetrics, setIsToggledMetrics] = useState(isToggledMetrics_obj)

  useEffect(() => {
    setIsToggledMetrics(isToggledMetrics_obj)
  }, [])
  Math.ceil(Object.keys(categoryObj).length / 3)

  for (let i = 0; i < Math.ceil(Object.keys(categoryObj).length); i++) {
    const first = i
    const second = i + 3
    if (second % 3 == 0) {
      // if (second > Math.ceil(Object.keys(categoryObj).length)) {
      //   sliceArray.push({ first: i, second: Math.ceil(Object.keys(categoryObj).length) + 1 })
      // } else {
      sliceArray.push({ first: i, second: i + 3 })
    }
  }

  console.log(sliceArray)

  return (
    <div className="customization-metrics">
      <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', paddingLeft: '5px', paddingTop: '10px' }}>
        {sliceArray.map(slicing => {
          return <div style={{ display: 'flex', gap: '8px' }}>
            {Object.keys(categoryObj).slice(slicing.first, slicing.second).map(mapMetric => {
              const metric = categoryObj[mapMetric][0]
              return <div className='screener-metric-button'>
                <p style={{ margin: '0', fontSize: '18px', fontWeight: '500' }}>{metric.label}</p>
              </div>
            })}
          </div>
        })}
      </div>



    </div>
  )
}
