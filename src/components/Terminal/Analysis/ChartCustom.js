import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Chart from './Chart'
import ChartLegend from './ChartLegend'


export default function ChartCustom({
  metrics,
  reports,
  timeframe
}) {

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
        position: 'right',
        ticks: {
          color: 'white'
        },
      },
      y2: {
        type: 'linear',
        display: false,
        position: 'right',
        ticks: {
          color: 'white'
        },
      },
      y3: {
        type: 'linear',
        display: false,
        position: 'right',
        ticks: {
          color: 'white'
        },
      },
      y4: {
        type: 'linear',
        display: false,
        position: 'right',
        ticks: {
          color: 'white'
        },
      }

    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (data) {
            if (data.dataset.yAxisID != 'y2' && data.dataset.yAxisID != 'y3') {
              if (Math.abs(data.raw) >= 1000000000000) {
                return (data.raw / 1000000000000).toFixed(1) + 'T'
              } else if (Math.abs(data.raw) >= 1000000000) {
                return (data.raw / 1000000000).toFixed(1) + 'B';
              } else if (Math.abs(data.raw) >= 1000000) {
                return (data.raw / 1000000).toFixed(1) + 'M';
              } else if (Math.abs(data.raw) >= 1000) {
                return (data.raw / 1000).toFixed(1) + 'K';
              } else {
                return data.raw.toFixed(2);
              }
            } else {
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

  Object.keys(reports).forEach(period => {
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
    fiscalReports.push(reports[`${period}`])
  })

  const lastPeriods = fiscalPeriods.splice(fiscalPeriods.length - (timeframe == 'yearly' ? 1 : 4), (timeframe == 'yearly' ? 1 : 4))
  const lastReports = fiscalReports.splice(fiscalReports.length - (timeframe == 'yearly' ? 1 : 4), (timeframe == 'yearly' ? 1 : 4))
  lastReports.reverse()

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
          yAxisID: metric.yAxis,

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
            yAxisID: metric.yAxis,

            barPercentage: .85,
            borderRadius: 50 / Number(fiscalPeriods.length) + 3,
            order: metric.extraInfo == 'precentage' ? 1 : 2,
          }

        } else {
          return null
        }
      }).filter(obj => obj !== null)
    })
  }, [tableState, reports])

  useEffect(() => {

    ['y1', 'y2', 'y3', 'y4'].forEach(y => {

      if (chartData.datasets.filter(dataset => dataset.yAxisID == y).length) {

        const result = chartData.datasets.filter(dataset => dataset.yAxisID == y).reduce((acc, current) => {
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
            [y]: {
              ...prevOptions.scales[y],
              display: true,
              afterTickToLabelConversion: function (scaleInstance) {
                scaleInstance.ticks.pop();
                scaleInstance.ticks.shift();
              },

              ticks: {
                color: 'white',
                callback: function (value) {
                  if (y == 'y2' || y == 'y3') {
                    return (value * 100).toFixed(0) + '%';
                  } else {
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
                  }
                },
              },

              min: result.lowest * .9,
              max: result.highest / .95,
            }
          }
        }));

      } else {
        setChartOptions(prevOptions => ({
          ...prevOptions,
          scales: {
            ...prevOptions.scales,
            [y]: {
              ...prevOptions.scales[y],
              display: false
            }
          }
        }));
      }
    })


  }, [chartData])


  return (
    <div>
      <div className="chart-div">
        <div style={{ marginTop: `${window.innerWidth < 2000 ? '10px' : ''}` }} className='chart-legend'>
          <ChartLegend chartData={chartData} metrics={metrics} />
        </div>
        <div style={{ marginTop: `${window.innerWidth < 2000 ? '0px' : '25px'}`, height: `${window.innerWidth < 2000 ? '36rem' : '52rem'}` }} className="chart">
          <Chart data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  )
}
