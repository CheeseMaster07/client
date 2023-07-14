import React from 'react'

import '../../../../../css/colors.css'

import dots_png from '../../../../../logos/dots.png'
import rightArrow_png from '../../../../../logos/right-arrow.png'
import downArrow_png from '../../../../../logos/down-arrow.png'

import ExtrasMenu from './ExtrasMenu'

export default function TableRow({
  typeOfRow,
  metric,
  isToggledMetrics,
  setIsToggledMetrics,
  isCollapsedMetrics,
  setIsCollapsedMetrics,
  isExtrasMenuToggled,
  setIsExtrasMenuToggled,
  extras,
  setExtras,
  fiscalReports,
  IS
}) {


  function formatNumber(num, extraInfo) {
    if (extraInfo == 'change' && typeof num == 'number') {
      return `${((num * 100)?.toFixed(2))}%`
    }
    if (!num) {
      if (extraInfo == 'change') {
        return ''
      }
      return '---'
    }

    if (extraInfo == 'precentage') {
      return `${((num * 100)?.toFixed(2))}%`
    }

    if (extraInfo == 'whole') {
      return `${(num.toFixed(2))}`
    }

    if (Math.abs(num) >= 1000000000000) {
      return (num / 1000000000000).toFixed(1) + 'T'
    } else if (Math.abs(num) >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (Math.abs(num) >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (Math.abs(num) >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else if (Math.abs(num) <= 100) {
      return `${((num * 100)?.toFixed(2))}%`
    } else {
      return num;
    }
  }

  return (
    typeOfRow == 'real' ?
      < tr style={metric.type == 'main' ? { fontWeight: 'bold' } : !isCollapsedMetrics[metric.id] && isCollapsedMetrics.hasOwnProperty(metric.id) ? { fontWeight: 'bold' } : {}} >
        <th className="statements-table-first-column" style={metric.type == 'main' ? { fontWeight: 'bold' } : !isCollapsedMetrics[metric.id] && isCollapsedMetrics.hasOwnProperty(metric.id) ? { fontWeight: 'bold' } : { fontWeight: '400' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label class='checkbox' for={`toggle-${metric.id}`}>
                  <input type='checkbox' checked={isToggledMetrics[metric.id]} class='checkbox__input' id={`toggle-${metric.id}`} />
                  <div onClick={() => {
                    setIsToggledMetrics(() => ({
                      ...isToggledMetrics, // Copy the previous state object
                      [metric.id]: !isToggledMetrics[metric.id], // Modify the desired item in the copy
                    }));
                  }} class='checkbox__box' ></div>
                </label>
              </div>

              {metric.collapsible ?
                <div onClick={() => {
                  setIsCollapsedMetrics(() => ({
                    ...isCollapsedMetrics, // Copy the previous state object
                    [metric.id]: !isCollapsedMetrics[metric.id], // Modify the desired item in the copy
                  }));
                }} className='dropdown-button' style={{ alignItems: 'center', cursor: 'pointer', display: 'flex', marginRight: '5px', padding: '3px', borderRadius: '2px' }}>
                  {isCollapsedMetrics[metric.id] ?
                    <img src={rightArrow_png} style={{ width: '12px', userSelect: 'none' }} />
                    :
                    <img src={downArrow_png} style={{ width: '12px', userSelect: 'none' }} />
                  }

                </div>

                :
                ''}
              <div style={metric.type.includes('sub') ? { marginLeft: '25px' } : {}}>{metric.label}</div>
            </div>
            <img onClick={() => {
              setIsExtrasMenuToggled(() => {
                const updatedState = { ...isExtrasMenuToggled };

                // Set all metrics to false
                Object.keys(updatedState).forEach(key => {
                  updatedState[key] = false;
                });

                // Set the specified metric to true
                updatedState[metric.id] = !isExtrasMenuToggled[metric.id];

                return updatedState;
              });
            }} src={dots_png} style={{ width: '18px', userSelect: 'none', cursor: 'pointer', zIndex: '2' }} />

          </div>
          {isExtrasMenuToggled[metric.id] ?
            <ExtrasMenu metric={metric} extras={extras} setExtras={setExtras} />
            :
            ''}

        </th>
        {
          fiscalReports.map((report, index) => {
            return (
              <td>{formatNumber(report[metric.id], metric.extraInfo)}</td>
            )
          })
        }
      </tr >
      :
      typeOfRow == 'YoY' ?
        < tr style={{ fontWeight: '400' }} >
          <th className="statements-table-first-column" style={{ fontStyle: 'italic', fontWeight: '400', color: '#969696', fontSize: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', marginLeft: '50px' }}>
                % Year over Year
              </div>
            </div>
          </th>
          {
            fiscalReports.map((report, index) => {
              const currentReport = report
              const previousReport = fiscalReports[index - 1]
              const currentValue = currentReport[metric.id];
              const previousValue = previousReport ? previousReport[metric.id] : 0;
              let change = (currentValue - previousValue) / previousValue
              if (previousReport == undefined) { change = '' }
              return (
                <td style={change > 0 ? { color: 'var(--growth)', fontStyle: 'italic', fontWeight: '400', fontSize: '15px' } : { color: 'var(--decline)', fontStyle: 'italic', fontWeight: '400', fontSize: '15px' }}>{formatNumber(change, 'change')}</td>
              )
            })
          }
        </tr >
        :
        typeOfRow == 'margin' ?
          < tr style={{ fontWeight: '400' }} >
            <th className="statements-table-first-column" style={{ fontStyle: 'italic', fontWeight: '400', color: '#969696', fontSize: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', marginLeft: '50px' }}>
                  % of Revenue
                </div>
              </div>
            </th>
            {
              fiscalReports.map((report, index) => {
                const revenue = IS[report.date]?.totalRevenue;
                const EBIT = report.operatingIncome;

                if (metric.id != 'incomeTaxExpense') {
                  let margin = report[metric.id] / revenue
                  return (
                    <td style={{ fontStyle: 'italic', fontWeight: '400', color: 'yellow', fontSize: '15px' }}>{formatNumber(margin, 'change')}</td>
                  )
                } else {
                  let margin = report[metric.id] / EBIT
                  return (
                    <td style={{ fontStyle: 'italic', fontWeight: '400', color: 'yellow', fontSize: '15px' }}>{formatNumber(margin, 'change')}</td>
                  )
                }

              })
            }
          </tr >
          :
          ''

  )
}