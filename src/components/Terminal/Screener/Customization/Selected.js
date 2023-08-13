import React, { useState, useEffect } from 'react'

import dots_png from '../../../../logos/dots.png'
import delete_png from '../../../../logos/delete.png'
import Metrics from './Metrics'

export default function Selected({ presetList, setPresetList, isDescMenuToggled, setIsDescMenuToggled }) {

  const alignCenterStyle = { display: 'flex', alignItems: 'center' }


  return (
    <div className="customization-selected">
      <p>Selected</p>

      {presetList.map((metric, index) => {
        if (metric.label != 'ticker')
          return <div className="selected-metric">
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={alignCenterStyle}>
                <div className='deleteButton' style={alignCenterStyle} onClick={() => {
                  setPresetList(presetList.filter(listMetric => listMetric != metric))
                }}>
                  <img src={delete_png} style={{ height: '18px', userSelect: 'none' }} />

                </div>

              </div>
              <div>
                <p>{metric.label}</p>
                <p className="selected-metric-desc">{metric.desc}</p>
              </div>
            </div>

            <div style={alignCenterStyle}>

              <img onClick={() => {
                setIsDescMenuToggled(() => {
                  const updatedState = { ...isDescMenuToggled };

                  // Set all metrics to false
                  Object.keys(updatedState).forEach(key => {
                    updatedState[key] = false;
                  });

                  // Set the specified metric to true
                  updatedState[metric.id] = !isDescMenuToggled[metric.id];

                  return updatedState;
                });
              }} src={dots_png} style={{ height: '21px', userSelect: 'none', cursor: 'pointer', zIndex: '2' }} />
            </div>
          </div>
      })}
    </div>
  )
}
