import React, { useState, useEffect } from 'react'

import Chart from '../../Chart'

export default function Multiples({ stock, periods, reports }) {
  const currentYear = new Date().getFullYear()

  const [chartOptions, setChartOptions] = useState({
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          callback: function (value, index) {
            const year = this.getLabelForValue(value).split('-')[0]

            if (index % 23 == 0) {
              return year;
            }

            return ''

          },
          color: 'white'
        },
        grid: {
          display: false
        }
      },
      y2: {
        ticks: {
          color: 'white'
        },

      },

    },
    plugins: {
      options: {

      },
      legend: {
        display: false
      },
    }
  })

  let timeframe
  if (Number(periods) <= 5) {
    timeframe = 1
  } else {
    timeframe = 6

  }

  const [chartData, setChartData] = useState({
    labels: stock.priceAction.filter(period => Number(period.date.split('-')[0]) > currentYear - Number(periods)).map((period, index) => index % timeframe === 0 ? period.date : null).filter(obj => obj !== null),
    datasets: [{
      type: 'line',
      label: 'ok',
      data: stock.priceAction.filter(period => Number(period.date.split('-')[0]) > currentYear - Number(periods)).map((period, index) => index % timeframe === 0 ? period.adjusted_close : null).filter(obj => obj !== null),
      pointRadius: 0,
      yAxisID: 'y2'
    }]
  })

  useEffect(() => {

    setChartData({
      labels: stock.priceAction.filter(period => Number(period.date.split('-')[0]) > currentYear - Number(periods)).map((period, index) => index % timeframe === 0 ? period.date : null).filter(obj => obj !== null),
      datasets: [{
        type: 'line',
        label: 'ok',
        data: stock.priceAction.filter(period => Number(period.date.split('-')[0]) > currentYear - Number(periods)).map((period, index) => index % timeframe === 0 ? period.adjusted_close : null).filter(obj => obj !== null),
        pointRadius: 0,
        yAxisID: 'y2'
      }]
    })
    chartOptions.scales.y2.min = 20
  }, [periods])

  useEffect(() => {
    if (chartData.datasets.filter(dataset => dataset.yAxisID == 'y2').length) {

      const result = chartData.datasets.filter(dataset => dataset.yAxisID == 'y2').reduce((acc, current) => {
        current.data.forEach(num => {
          if (num > acc.highest) {
            acc.highest = num;
          }
          if (num < acc.lowest) {
            acc.lowest = num;
          }
        });
        return acc;
      }, { highest: -Infinity, lowest: Infinity });

      setChartOptions(prevOptions => ({
        ...prevOptions,
        scales: {
          ...prevOptions.scales,
          y2: {
            ...prevOptions.scales.y2,
            display: true,
            min: Math.floor(result.lowest - 2),
            max: Math.floor(result.highest + 2),
          }
        }
      }));

    } else {
      setChartOptions(prevOptions => ({
        ...prevOptions,
        scales: {
          ...prevOptions.scales,
          y1: {
            ...prevOptions.scales.y1,
            display: false
          }
        }
      }));
    }

  }, [chartData])


  return (
    <div>
      <div className="chart-div">
        <div style={{ marginTop: '50px', height: '55rem' }} className="chart">
          <Chart data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  )
}
