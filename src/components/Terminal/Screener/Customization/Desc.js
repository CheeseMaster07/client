import React, { useEffect, useState } from 'react'

import { categories } from '../Categories'

export default function Desc({ category, metric, presetList, setPresetList }) {
  const metricArray = categories[category][metric]
  const [label, setLabel] = useState()
  const [descArray_1, setDescArray_1] = useState([])
  const [descArray_2, setDescArray_2] = useState([])
  const [isDescSelected_1, setIsDescSelected_1] = useState({})
  const [isDescSelected_2, setIsDescSelected_2] = useState({})
  const [desc_1, setDesc_1] = useState()
  const [desc_2, setDesc_2] = useState()
  const [alreadyExists, setAlreadyExists] = useState()
  const [numOfDifferentDesc, setNumOfDifferentDesc] = useState()

  function removeDuplicates(inputArray) {
    return [...new Set(inputArray)];
  }

  const descArrayStyle = { display: 'flex', justifyContent: 'center', gap: '35px' };

  function chooseMetric(segment, id, desc1, desc2) {
    if (!desc2) {
      const result = categories[segment][id].filter(metric => metric.desc === desc1)[0]

      return result;
    } else {
      return categories[segment][id].filter(metric => metric.desc === `${desc1} | ${desc2}`)[0];
    }
  }

  function addToScreener() {

    if (desc_2) {
      setPresetList([...presetList, chooseMetric(category, metric, desc_1, desc_2)])

    } else {
      setPresetList([...presetList, chooseMetric(category, metric, desc_1)])

    }
  }

  function deleteFromScreener() {
    console.log(presetList)
    let formattedDesc = `${desc_1} | ${desc_2}`
    if (!desc_2) {
      formattedDesc = desc_1
    }
    setPresetList(presetList.filter(preset => preset.id != metric || preset.desc != formattedDesc))
  }

  useEffect(() => {
    if (metricArray) {
      if (metricArray[0].label2) {
        setLabel(metricArray[0].label2)
      } else {
        setLabel(metricArray[0].label)
      }
      setDescArray_1(removeDuplicates(metricArray.map(desc => desc.desc.split(' | ')[0])))
      setDescArray_2(removeDuplicates(metricArray.map(desc => desc.desc.split(' | ')?.[1]).filter(desc => desc)))
    }
  }, [metricArray])

  useEffect(() => {
    if (descArray_2) {
      if (descArray_2.length) {
        setNumOfDifferentDesc(2)
      } else {
        setNumOfDifferentDesc(1)
      }
    }

  }, [descArray_1, descArray_2])

  useEffect(() => {
    const isDescSelected_1_obj = {}
    const isDescSelected_2_obj = {}

    descArray_1.forEach(desc => {
      isDescSelected_1_obj[desc] = false
    })

    descArray_2.forEach(desc => {
      isDescSelected_2_obj[desc] = false
    })

    setIsDescSelected_1(isDescSelected_1_obj)
    setIsDescSelected_2(isDescSelected_2_obj)
  }, [descArray_1, descArray_2])

  useEffect(() => {
    let desc_1 = null;
    let desc_2 = null;

    for (const key in isDescSelected_1) {
      if (isDescSelected_1[key] === true) {
        desc_1 = key;
        break;
      }
    }

    for (const key in isDescSelected_2) {
      if (isDescSelected_2[key] === true) {
        desc_2 = key;
        break;
      }
    }
    setDesc_1(desc_1)
    setDesc_2(desc_2)
  }, [isDescSelected_1, isDescSelected_2])

  useEffect(() => {
    setAlreadyExists(presetList.some(item => item.desc === `${desc_1} | ${desc_2}` && item.id === metricArray[0].id || item.desc === `${desc_1}` && item.id === metricArray[0].id))
  }, [desc_1, desc_2, presetList])

  const checkBoxStyle = { height: '22px', width: '22px', borderRadius: '5px' }


  return (
    <div className="customization-desc">
      <div style={{ textAlign: 'center' }}>
        <h4>{label}</h4>
        <div className='descArrays'>
          <div style={descArrayStyle}>
            {descArray_1.map(desc => {
              return <div>
                {desc}
                <label class='checkbox' for={`toggle-${desc}-desc`}>
                  <input type='checkbox' checked={isDescSelected_1[desc] ? true : false} class='checkbox__input' id={`toggle-${desc}-desc`} />
                  <div onClick={() => {
                    const updatedState = {};

                    for (const key in isDescSelected_1) {
                      updatedState[key] = false;
                    }

                    updatedState[desc] = !isDescSelected_1[desc]

                    setIsDescSelected_1(updatedState);
                  }} class='checkbox__box' style={checkBoxStyle}></div>
                </label>

              </div>
            })}
          </div>
          {descArray_2.length ?
            <div style={descArrayStyle}>
              {descArray_2.map(desc => {
                return <div>
                  {desc}
                  <label class='checkbox' for={`toggle-${desc}-desc`}>
                    <input type='checkbox' checked={isDescSelected_2[desc] ? true : false} class='checkbox__input' id={`toggle-${desc}-desc`} />
                    <div onClick={() => {
                      const updatedState = {};

                      for (const key in isDescSelected_2) {
                        updatedState[key] = false;
                      }

                      updatedState[desc] = !isDescSelected_2[desc]

                      setIsDescSelected_2(updatedState);
                    }} class='checkbox__box' style={checkBoxStyle}></div>
                  </label>
                </div>
              })}
            </div>
            :
            ''}
        </div>


      </div>
      <div style={{ textAlign: 'center' }}>
        <button onClick={() => {
          let canClick = false
          if (descArray_2.length) {
            if (Object.values(isDescSelected_1).includes(true) && Object.values(isDescSelected_2).includes(true)) {
              canClick = true
            }

          } else {
            if (Object.values(isDescSelected_1).includes(true)) {
              canClick = true
            }

          }

          if (canClick) {
            if (!alreadyExists) {
              addToScreener(isDescSelected_1, isDescSelected_2)

            } else {
              deleteFromScreener(isDescSelected_1, isDescSelected_2)
            }
          }

        }} style={
          descArray_2.length ?
            { backgroundColor: Object.values(isDescSelected_1).includes(true) && Object.values(isDescSelected_2).includes(true) ? (alreadyExists ? 'rgb(222, 38, 38)' : 'var(--green-light)') : 'var(--green-middark)' }
            :
            { backgroundColor: Object.values(isDescSelected_1).includes(true) ? (alreadyExists ? 'rgb(222, 38, 38)' : 'var(--green-light)') : 'var(--green-middark)' }
        }>
          {alreadyExists ?
            'Delete'
            :
            'Add'
          }
        </button>

      </div>
    </div >
  )
}