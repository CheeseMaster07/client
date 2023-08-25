import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import '../../../css/terminal/segments/table.css'
import '../../../css/colors.css'

import dots_png from '../../../logos/dots.png'
import rightArrow_png from '../../../logos/right-arrow.png'
import downArrow_png from '../../../logos/down-arrow.png'

import TableRow from './TableRow_For_Chart'
import ExtrasMenu from './Segments/Statements/ExtrasMenu'

import { getTableState } from '../../../actions/table'


export default function Table({ data, metrics, timeframe, IS }) {
  const dispatch = useDispatch()

  const isCollapsedMetrics_obj = {}
  const isToggledMetrics_obj = {}
  const isExtrasMenuToggled_obj = {}
  const extras_obj = {}

  const autoToggledMetrics = [
    'totalRevenue',
    'netIncome',
    'totalAssets',
    'totalLiab',
    'totalStockholderEquity',
    'totalCashFromOperatingActivities',
    'totalCashflowsFromInvestingActivities',
    'totalCashFromFinancingActivities',
    'freeCashFlow',
    'sharesOutstanding',
    'returnOnAssets',
    'dividendsPerShare',
    'dividendsYield',
  ]

  metrics.forEach(metric => {
    if (autoToggledMetrics.includes(metric.id)) {
      isToggledMetrics_obj[metric.id] = true
    } else {
      isToggledMetrics_obj[metric.id] = false

    }
  })

  metrics.forEach(metric => {
    isExtrasMenuToggled_obj[metric.id] = false
  })

  metrics.forEach(metric => {
    if (metric.id == 'totalRevenue' || metric.id == 'dividendsPerShare') {
      extras_obj[metric.id] = { YoY: true, margin: false }
    } else if (metric.id == 'grossProfit') {
      extras_obj[metric.id] = { YoY: false, margin: true }

    } else {
      extras_obj[metric.id] = { YoY: false, margin: false }

    }
  })

  metrics.filter(metrics => metrics.collapsible).forEach(metric => {
    isCollapsedMetrics_obj[metric.id] = true
  })

  const [isCollapsedMetrics, setIsCollapsedMetrics] = useState(isCollapsedMetrics_obj)
  const [isToggledMetrics, setIsToggledMetrics] = useState(isToggledMetrics_obj)
  const [isExtrasMenuToggled, setIsExtrasMenuToggled] = useState(isExtrasMenuToggled_obj)
  const [extras, setExtras] = useState(extras_obj)


  useEffect(() => {
    setExtras(extras_obj)
    setIsCollapsedMetrics(isCollapsedMetrics_obj)
    setIsToggledMetrics(isToggledMetrics_obj)
    setIsExtrasMenuToggled(isExtrasMenuToggled_obj)
  }, [metrics])

  useEffect(() => {
    dispatch(getTableState(isToggledMetrics))

  }, [isToggledMetrics])


  const fiscalPeriods = []
  const fiscalReports = []

  Object.keys(data).forEach(period => {
    if (timeframe == 'yearly') {
      fiscalPeriods.push(period.split('-')[0])
    } else {
      const [year, month] = period.split('-');
      let quarter;

      if (month === '01' || month === '02' || month === '03') {
        quarter = 'Q1';
      } else if (month === '04' || month === '05' || month === '06') {
        quarter = 'Q2';
      } else if (month === '07' || month === '08' || month === '09') {
        quarter = 'Q3';
      } else {
        quarter = 'Q4';
      }

      const formattedPeriod = `${quarter} ${year}`;
      fiscalPeriods.push(formattedPeriod)
    }
    fiscalReports.push(data[`${period}`])
  })

  const lastPeriods = fiscalPeriods.splice(fiscalPeriods.length - (timeframe == 'yearly' ? 1 : 4), (timeframe == 'yearly' ? 1 : 4))
  const lastReports = fiscalReports.splice(fiscalReports.length - (timeframe == 'yearly' ? 1 : 4), (timeframe == 'yearly' ? 1 : 4))
  lastReports.reverse()

  fiscalPeriods.reverse()
  fiscalReports.reverse()
  // fiscalReports.shift()
  // fiscalPeriods.shift()

  // console.log(fiscalReports)


  return (
    <div className='statements-table-container'>
      <table className='statements-table'>
        <colgroup>
          <col style={{ width: '320px', textAlign: 'left', backgroundColor: 'var(--green-middark)' }} /> {/* Fixed width for the first column */}
          {fiscalPeriods.map((period) => (
            <col key={period} style={{ width: `${86.3 / fiscalPeriods.length}%` }} />
          ))}

        </colgroup>
        <thead>
          <tr>
            <th className="statements-table-first-column">USD</th>
            {fiscalPeriods.map((period) => {

              return (
                <th key={period}>{period}</th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => {
            if (metric.type.includes('sub')) {
              if (isCollapsedMetrics[metric.type.split('-')[0]]) {
                return null
              }
            }
            // Check if the necessary state values are populated before rendering
            if (!extras || !isToggledMetrics || !isCollapsedMetrics || !isExtrasMenuToggled) {
              return null; // Skip rendering if the state values are empty
            }


            return (

              <>
                <TableRow
                  typeOfRow={'real'}
                  metric={metric}
                  isToggledMetrics={isToggledMetrics}
                  setIsToggledMetrics={setIsToggledMetrics}
                  isCollapsedMetrics={isCollapsedMetrics}
                  setIsCollapsedMetrics={setIsCollapsedMetrics}
                  isExtrasMenuToggled={isExtrasMenuToggled}
                  setIsExtrasMenuToggled={setIsExtrasMenuToggled}
                  extras={extras}
                  setExtras={setExtras}
                  fiscalReports={fiscalReports}
                  IS={IS}

                />
                {extras[metric.id]?.YoY ?

                  < TableRow
                    typeOfRow={'YoY'}
                    metric={metric}
                    isToggledMetrics={isToggledMetrics}
                    setIsToggledMetrics={setIsToggledMetrics}
                    isCollapsedMetrics={isCollapsedMetrics}
                    setIsCollapsedMetrics={setIsCollapsedMetrics}
                    isExtrasMenuToggled={isExtrasMenuToggled}
                    setIsExtrasMenuToggled={setIsExtrasMenuToggled}
                    extras={extras}
                    setExtras={setExtras}
                    lastReports={lastReports}
                    fiscalReports={fiscalReports}
                    IS={IS}
                    timeframe={timeframe}

                  />

                  :
                  ''
                }
                {extras[metric.id]?.margin ?
                  <TableRow
                    typeOfRow={'margin'}
                    metric={metric}
                    isToggledMetrics={isToggledMetrics}
                    setIsToggledMetrics={setIsToggledMetrics}
                    isCollapsedMetrics={isCollapsedMetrics}
                    setIsCollapsedMetrics={setIsCollapsedMetrics}
                    isExtrasMenuToggled={isExtrasMenuToggled}
                    setIsExtrasMenuToggled={setIsExtrasMenuToggled}
                    extras={extras}
                    setExtras={setExtras}
                    fiscalReports={fiscalReports}
                    IS={IS}
                  />
                  :
                  ''
                }
              </>
            )
          })}
        </tbody>
      </table>
    </div >

  )
}
