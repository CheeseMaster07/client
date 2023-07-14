import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Chart from '../../Chart'
import ChartLegend from './ChartLegend'
import '../../../../../css/terminal/chart.css'


export default function StatementsChart({ data, state, metrics }) {



  const tableState = useSelector(state => state.tableState)

  const [chartOptions, setChartOptions] = useState({
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          display: false
        }
      },
      y1: {
        type: 'linear',
        display: false,
        position: 'left',
        ticks: {
          callback: function (value) {
            if (Math.abs(value) >= 1000000000000) {
              return (value / 1000000000000).toFixed(1) + 'T'
            } else if (Math.abs(value) >= 1000000000) {
              return (value / 1000000000).toFixed(1) + 'B';
            } else if (Math.abs(value) >= 1000000) {
              return (value / 1000000).toFixed(1) + 'M';
            } else if (Math.abs(value) >= 1000) {
              return (value / 1000).toFixed(1) + 'K';
            } else {
              return value;
            }
          },
          color: 'white'
        },
        grid: {
          color: 'rgb(30, 30, 30)'
        }
      },
      y2: {
        type: 'linear',
        position: 'right',
        display: false,
        max: 0,
        min: 1,
        ticks: {
          callback: function (value) {
            return (value * 100).toFixed(0) + '%'; // convert it to percentage
          },
          color: 'white'
        },
        grid: {
          display: false
        }
      },
      y3: {
        type: 'linear',
        position: 'left',
        display: false,

        max: 0,
        min: 3,
        ticks: {
          color: 'white'
        },
        grid: {
          display: false
        }
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (data) {
            if (data.dataset.yAxisID == 'y1') {
              if (Math.abs(data.raw) >= 1000000000000) {
                return (data.raw / 1000000000000).toFixed(1) + 'T'
              } else if (Math.abs(data.raw) >= 1000000000) {
                return (data.raw / 1000000000).toFixed(1) + 'B';
              } else if (Math.abs(data.raw) >= 1000000) {
                return (data.raw / 1000000).toFixed(1) + 'M';
              } else if (Math.abs(data.raw) >= 1000) {
                return (data.raw / 1000).toFixed(1) + 'K';
              } else {
                return data.raw;
              }
            } else if (data.dataset.yAxisID == 'y2') {
              return (data.raw * 100).toFixed(2) + '%';
            }
          }
        }
      },
      legend: {
        display: false
      },
    }
  })


  const fiscalPeriods = []
  const fiscalReports = []

  Object.keys(data).forEach(period => {
    if (state.timeframe == 'yearly') {
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

  fiscalPeriods.reverse()
  fiscalReports.reverse()


  const [chartData, setChartData] = useState({
    labels: fiscalPeriods,
    datasets: metrics.map(metric => {
      if (tableState[metric.id]) {
        return {
          label: metric.label,
          type: metric.extraInfo == 'precentage' ? 'line' : 'bar',
          data: fiscalReports.map(report => report[metric.id]),
          backgroundColor: metric.color,
          borderColor: metric.color,
          yAxisID: metric.extraInfo == 'precentage' ? 'y2' : metric.extraInfo == 'whole' ? 'y3' : 'y1',

          barPercentage: .85,
          borderRadius: 4,
        }
      } else {
        return null
      }
    }).filter(obj => obj !== null)
  })

  useEffect(() => {
    setChartData({
      labels: fiscalPeriods,
      datasets: metrics.map(metric => {
        if (tableState[metric.id]) {
          return {
            label: metric.label,
            type: metric.extraInfo == 'precentage' ? 'line' : 'bar',
            data: fiscalReports.map(report => report[metric.id]),
            backgroundColor: metric.color,
            borderColor: metric.color,
            yAxisID: metric.extraInfo == 'precentage' ? 'y2' : metric.extraInfo == 'whole' ? 'y3' : 'y1',
            barPercentage: .85,
            borderRadius: 50 / Number(state.periods) + 3,

          }
        } else {
          return null
        }
      }).filter(obj => obj !== null)
    })
  }, [state, tableState])

  useEffect(() => {
    if (chartData.datasets.filter(dataset => dataset.yAxisID == 'y1').length) {

      setChartOptions(prevOptions => ({
        ...prevOptions,
        scales: {
          ...prevOptions.scales,
          y1: {
            ...prevOptions.scales.y1,
            display: true
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
            min: result.lowest - .03,
            max: result.highest + .03,
          }
        }
      }));

    } else {
      setChartOptions(prevOptions => ({
        ...prevOptions,
        scales: {
          ...prevOptions.scales,
          y2: {
            ...prevOptions.scales.y2,
            display: false
          }
        }
      }));
    }

    if (chartData.datasets.filter(dataset => dataset.yAxisID == 'y3').length) {

      const result = chartData.datasets.filter(dataset => dataset.yAxisID == 'y3').reduce((acc, current) => {
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
          y3: {
            ...prevOptions.scales.y3,
            display: true,
            min: result.lowest - .03,
            max: result.highest + .03,
          }
        }
      }));

    } else {
      setChartOptions(prevOptions => ({
        ...prevOptions,
        scales: {
          ...prevOptions.scales,
          y3: {
            ...prevOptions.scales.y3,
            display: false
          }
        }
      }));
    }
  }, [chartData])

  return (

    <div className="chart-div">
      <div className='chart-legend'>
        <ChartLegend chartData={chartData} metrics={metrics} />
      </div>
      <div className="chart">
        <Chart data={chartData} options={chartOptions} />
      </div>
    </div>


  )
}


