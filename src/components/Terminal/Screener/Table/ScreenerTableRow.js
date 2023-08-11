import React from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { TransformMetric } from './metricsTransformer'

export default function ScreenerTableRow({ metrics, stock, index }) {
  const navigate = useNavigate()
  function isOdd(number) {
    return number % 2 !== 0;
  }

  return (
    <tr>
      {metrics.map((metric, xIndex) => {
        let width = '150px'
        let color = ''
        if (metric.type == 'precentage-gain') {
          if (Number(TransformMetric(stock, metric).split('%')[0]) > 0) {
            color = 'var(--growth)'
          } else {
            color = 'var(--decline)'
          }
        }
        if (metric.type == 'precentage') {
          color = '#FAFF00'
        }
        if (xIndex == 0) {
          width = '213px'
        }

        return <td onClick={() => navigate(`/terminal/analysis/${stock.ticker}/${metric.link}`)} className='stockBar' style={isOdd(index) ? { backgroundColor: 'var(--green-dark)', width: width, color: color } : { backgroundColor: 'var(--green-middark)', width: width, color: color }}>
          {metric.label == 'ticker' ? stock.ticker : TransformMetric(stock, metric)}
        </td>
      })}
    </tr>
  )
}
