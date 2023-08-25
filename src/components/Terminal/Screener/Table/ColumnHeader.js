import React, { useState, useEffect } from 'react'

import { fetchSectorsandIndustries } from '../../../../api/index'

import arrow_png from '../../../../logos/arrow.png'
import upsideDownArrow_png from '../../../../logos/upsideDownArrow.png'
import twoArrows_png from '../../../../logos/twoArrows.png'

export default function ColumnHeader({
  metric,
  filter,
  setFilter,
  sortBy,
  setSortBy
}) {
  //console.log(metric)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Select');
  const [options, setOptions] = useState({
    sector: [],
    industry: []
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  function handleTextChange(option) {
    setFilter((prevFilter) => {
      const existingArr = prevFilter[metric.id]?.arr || [];
      const updatedArr = existingArr.includes(option)
        ? existingArr.filter((item) => item !== option)
        : [...existingArr, option];

      return {
        ...prevFilter,
        [metric.id]: {
          ...prevFilter[metric.id],
          arr: updatedArr,
        },
      };
    });

  }

  useEffect(() => {
    async function getSectorsandIndustries() {
      const { data } = await fetchSectorsandIndustries()
      setOptions({
        sector: data.sectors,
        industry: data.industies,
      })

    }
    getSectorsandIndustries()
  }, [])

  useEffect(() => {
    if (filter[metric.id]?.arr) {
      if (!filter[metric.id]?.arr.length) {
        handleOptionSelect(`Select`)
      } else {
        handleOptionSelect(`${filter[metric.id]?.arr.length} Selected`)

      }

    }

  }, [filter])

  function handleChange(e, type, typeOfNum) {
    const value = e.target.value !== '' ?
      (typeOfNum !== 'largeNum' ? Number(e.target.value) : Number(e.target.value) * 1000000000)
      : e.target.value;

    setFilter((prevFilter) => ({
      ...prevFilter,
      [metric.id]: {
        ...prevFilter[metric.id],
        [metric.desc]: {
          ...prevFilter[metric.id][metric.desc],
          [type]: value
        }
      }
    }));
  }

  // function handleChange(e, type, typeOfNum) {
  //   setFilter({
  //     ...filter, [metric.id]:
  //     {
  //       ...filter[metric.id], [metric.desc]:
  //       {
  //         ...filter[metric.id][metric.desc], [type]: e.target.value !== '' ?
  //           (typeOfNum != 'largeNum' ? Number(e.target.value) : Number(e.target.value * 1000000000))
  //           : e.target.value
  //       }
  //     }
  //   })
  // }

  function handleArrowClick() {
    const newMetric = metric.id != sortBy.id || metric.desc != sortBy.desc

    if (!sortBy.type || newMetric) {
      setSortBy({
        type: 'high',
        segment: metric.segment,
        id: metric.id,
        desc: metric.desc,
      })
    } else if (sortBy.type == 'high') {
      setSortBy({
        type: 'low',
        segment: metric.segment,
        id: metric.id,
        desc: metric.desc,
      })
    } else if (sortBy.type == 'low') {
      setSortBy({
        type: false,
        segment: metric.segment,
        id: metric.id,
        desc: metric.desc,
      })
    }

  }


  if (metric == 'tickers') {
    return <div></div>
  }
  //console.log(filter)
  return (
    <th>
      <div className='columnHeader'>
        <div className='columnHeader-label'>{metric.label}</div>
        <div className='columnHeader-description'>{metric.desc}</div>
        <div className='columnHeader-min-max'>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {metric.type != 'text' ?
                <label>Min</label>
                :
                <label>Select</label>
              }
              {metric.type != 'largeNum' ?
                <>
                  {
                    metric.type == 'text' ?
                      <div className="custom-select">
                        <div className="select-summary" onClick={toggleDropdown}>
                          <div className="summary-text">{selectedOption}</div>
                          <div className="arrow-icon">&#9662;</div>
                        </div>
                        {isOpen && (
                          <div className="dropdown-options">
                            {options[metric.id].map((option) => (
                              <div
                                style={filter[metric.id]?.arr.includes(option) ? { backgroundColor: 'var(--green-light)' } : {}}
                                key={option}
                                className="option"
                                onClick={async () => {
                                  handleTextChange(option)
                                }}
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      :
                      <input style={{ borderRight: 'solid 1px var(--green-middle)', borderRadius: '4px 0 0 4px' }} type='number' onChange={(e) => handleChange(e, 'min')}
                        value={filter[metric.id]?.[metric.desc]?.min ?? ''} />
                  }
                </>
                :
                <div style={{ position: 'relative' }}>
                  <input style={{ borderRight: 'solid 1px var(--green-middle)', borderRadius: '4px 0 0 4px' }} type='number' onChange={(e) => handleChange(e, 'min', 'largeNum')}
                    value={(filter[metric.id]?.[metric.desc]?.min ?? '') / 1000000000 || ''} />
                  <span className='largeNumUnit'>B</span>
                </div>

              }

            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {metric.type != 'text' ?
                <label>Max</label>
                :
                <label></label>
              }
              {metric.type != 'largeNum' ?
                <>
                  {
                    metric.type == 'text' ?
                      <></>
                      :
                      <input style={{ borderLeft: 'solid 1px var(--green-middle)', borderRadius: '0 4px 4px 0' }} type='number' onChange={(e) => handleChange(e, 'max')}
                        value={filter[metric.id]?.[metric.desc]?.max ?? ''} />
                  }
                </>
                :
                <div style={{ position: 'relative' }}>
                  <input style={{ borderLeft: 'solid 1px var(--green-middle)', borderRadius: '0 4px 4px 0' }} type='number' onChange={(e) => handleChange(e, 'max', 'largeNum')}
                    value={(filter[metric.id]?.[metric.desc]?.max ?? '') / 1000000000 || ''} />
                  <span className='largeNumUnit'>B</span>
                </div>
              }
            </div>
          </div>
        </div>
        <div onClick={handleArrowClick} className='columnHeader-arrow-button'>
          {(metric.label != 'ticker' ? (metric.id == sortBy.id && metric.desc == sortBy.desc && sortBy.type) : false) ?
            sortBy.type == 'high'
              ?
              <img style={{ width: '13px', marginBottom: '1px' }} src={arrow_png} />
              :
              <img style={{ width: '13px', marginBottom: '2px' }} src={upsideDownArrow_png} />
            :
            <img style={{ width: '23px', height: '21px', marginTop: '-2px' }} src={twoArrows_png} />
          }
          {(metric.label != 'ticker' ? (metric.id == sortBy.id && metric.desc == sortBy.desc && sortBy.type) : false) ?
            <div className="sortBy-color-bar"></div>
            :
            ''}
        </div>

      </div>
    </th >
  )
}
