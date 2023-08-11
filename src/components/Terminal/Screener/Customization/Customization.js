import React, { useState, useEffect } from 'react'
import '../../../../css/terminal/Screener/customization.css'

import CategoriesButtons from './CategoriesButtons'
import Desc from './Desc'
import Metrics from './Metrics'
import Selected from './Selected'

export default function Customization({ presetList, setPresetList, }) {
  const [category, setCategory] = useState('valuation')

  const isDescMenuToggled_obj = {}
  presetList.forEach((metric, index) => {
    if (metric.id)
      isDescMenuToggled_obj[metric.id] = false
  })
  const [isDescMenuToggled, setIsDescMenuToggled] = useState(isDescMenuToggled_obj)

  useEffect(() => {
    setIsDescMenuToggled(isDescMenuToggled_obj)

  }, [presetList])


  useEffect(() => {
    console.log(isDescMenuToggled)

  }, [isDescMenuToggled])




  return (
    <div className="customization">
      <div className='customization-header'>
        <h3>Customize</h3>
      </div>
      <div className='customization-categories'>
        <h3>Categories</h3>
        <CategoriesButtons
          category={category}
          setCategory={setCategory}
        />
      </div>
      <div style={{ height: '100%', display: 'flex' }}>
        <Selected presetList={presetList} setPresetList={setPresetList} isDescMenuToggled={isDescMenuToggled} setIsDescMenuToggled={setIsDescMenuToggled} />
        <div style={{ height: '100%', width: '72.5%' }}>
          <Metrics />
          <Desc />
        </div>

      </div>


    </div >
  )
}
