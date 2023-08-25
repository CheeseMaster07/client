import React, { useState, useEffect } from 'react'
import { categories } from '../Categories'


export default function Metrics({ category, metric, setMetric, presetList }) {
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

  useEffect(() => {
    console.log(metric)
    if (!categoryObj?.[metric]) {
      setMetric(categoryObj[Object.keys(categoryObj)[0]][0].id)

    }
  }, [category])
  return (
    <div className="customization-metrics">
      <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', paddingLeft: '5px', paddingTop: '10px' }}>
        {sliceArray.map(slicing => {
          return <div style={{ display: 'flex', gap: '8px' }}>
            {Object.keys(categoryObj).slice(slicing.first, slicing.second).map(mapMetric => {
              const varMetric = categoryObj[mapMetric][0]
              return <div onClick={() => setMetric(varMetric.id)} className='screener-metric-button' style={varMetric.id == metric ? { backgroundColor: 'var(--green-light)', borderColor: 'rgba(255, 255, 255, .7)' } : {}}>
                <p style={{ margin: '0', fontSize: '17px', fontWeight: '500' }}>{varMetric.label}</p>
              </div>
            })}
          </div>
        })}
      </div>



    </div>
  )
}
