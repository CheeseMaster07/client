import React from 'react'

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
  function formatResult(num) {
    try {
      switch (metric.type) {
        case 'largeNum':
          if (Math.abs(num) >= 1000000000000) {
            return (num / 1000000000000).toFixed(1) + 'T'
          } else if (Math.abs(num) >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
          } else if (Math.abs(num) >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
          } else if (Math.abs(num) >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
          }
          break;
        case 'smallNum':
          return `${num.toFixed(1)}`

          break;
        case 'precentage-gain':
          return `${num.toFixed(1)}%`

          break;
        case 'precentage':
          return `${num.toFixed(1)}%`

          break;

        default:
          break;
      }
    } catch (error) {
      return ''
    }

  }

  function handleChange(e, type, typeOfNum) {
    setFilter({
      ...filter, [metric.id]:
      {
        ...filter[metric.id], [metric.desc]:
        {
          ...filter[metric.id][metric.desc], [type]: e.target.value !== '' ?
            (typeOfNum != 'largeNum' ? Number(e.target.value) : Number(e.target.value * 1000000000))
            : e.target.value
        }
      }
    })
  }

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
              <label>Min</label>
              {metric.type != 'largeNum' ?
                <input style={{ borderRight: 'solid 1px var(--green-middle)', borderRadius: '4px 0 0 4px' }} type='number' onChange={(e) => handleChange(e, 'min')}
                  value={metric.label != 'ticker' ? filter[metric.id][metric.desc]?.min : ''} />
                :
                <div style={{ position: 'relative' }}>
                  <input style={{ borderRight: 'solid 1px var(--green-middle)', borderRadius: '4px 0 0 4px' }} type='number' onChange={(e) => handleChange(e, 'min', 'largeNum')}
                    value={metric.label != 'ticker' ? (filter[metric.id][metric.desc]?.min / 1000000000 ? filter[metric.id][metric.desc]?.min / 1000000000 : '') : ''} />
                  <span className='largeNumUnit'>B</span>
                </div>

              }

            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label>Max</label>
              {metric.type != 'largeNum' ?
                <input style={{ borderLeft: 'solid 1px var(--green-middle)', borderRadius: '0 4px 4px 0' }} type='number' onChange={(e) => handleChange(e, 'max')}
                  value={metric.label != 'ticker' ? filter[metric.id][metric.desc]?.max : ''} />
                :
                <div style={{ position: 'relative' }}>
                  <input style={{ borderLeft: 'solid 1px var(--green-middle)', borderRadius: '0 4px 4px 0' }} type='number' onChange={(e) => handleChange(e, 'max', 'largeNum')}
                    value={metric.label != 'ticker' ? (filter[metric.id][metric.desc]?.max / 1000000000 ? filter[metric.id][metric.desc]?.max / 1000000000 : '') : ''} />
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
