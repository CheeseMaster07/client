import React from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'

export default function BarChart({ data, options, type }) {

  if (type == 'pie') {
    return (
      <Pie id='myPieChart' data={data} options={options} />
    )
  }
  return (
    <Bar id='myChart' data={data} options={options} />
  )
}
