import React from 'react'

export default function ToggleMetric_part({ metric, isToggledMetrics, setIsToggledMetrics }) {

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label class='checkbox' for={`toggle-${metric.id}`}>
          <input type='checkbox' checked={isToggledMetrics[metric.id]} class='checkbox__input' id={`toggle-${metric.id}`} />
          <div onClick={() => {
            setIsToggledMetrics(() => ({
              ...isToggledMetrics, // Copy the previous state object
              [metric.id]: !isToggledMetrics[metric.id], // Modify the desired item in the copy
            }));
          }} class='checkbox__box' style={{ height: '20px', width: '20px' }} ></div>
        </label>
      </div>
      <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold' }}>{metric.label}</p>
    </div>

  )
}
