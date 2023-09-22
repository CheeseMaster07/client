import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Chart from './LineChart'

import ChartLegend from './ChartLegend'

export default function Multiples({ metrics, stock, periods, reports }) {
  const currentYear = new Date().getFullYear()

  const valuationState = useSelector(state => state.valuationState)
  // const coordinates = useSelector(state => state.coordinates)

  // useEffect(() => {
  //   console.log(coordinates)
  // }, [coordinates])

  function mousemoveHandler() {
    console.log('yes')
  }

  const [chartOptions, setChartOptions] = useState({
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          callback: function (value, index, values) {
            const year = this.getLabelForValue(value).split('-')[0];
            const totalYears = values.length;

            if (index === 0 || index === totalYears - 1) {
              // Always show the first and last years
              return year;
            } else if (index % Math.floor(totalYears / 10) === 0) {
              // Show years at regular intervals (adjust the divisor for desired spacing)
              return year;
            }

            return '';

          },
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
      },
      y5: {
        type: 'linear',
        display: false,
        position: 'right',
        ticks: {
          color: 'white'
        },
      },
      y6: {
        type: 'linear',
        display: false,
        position: 'right',
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
              return value?.toFixed(1);
            }
          },
          color: 'white'
        },
      },

    },
    plugins: {
      options: {

      },
      tooltip: {
        callbacks: {
          label: function (data) {
            if (data.dataset.yAxisID == 'y6') {
              if (Math.abs(data.raw) >= 1000000000000) {
                return (data.raw / 1000000000000).toFixed(1) + 'T'
              } else if (Math.abs(data.raw) >= 1000000000) {
                return (data.raw / 1000000000).toFixed(1) + 'B';
              } else if (Math.abs(data.raw) >= 1000000) {
                return (data.raw / 1000000).toFixed(1) + 'M';
              } else if (Math.abs(data.raw) >= 1000) {
                return (data.raw / 1000).toFixed(1) + 'K';
              } else {
                return data.raw?.toFixed(2);
              }
            } else {
              if (Math.abs(data.raw) >= 1) {
                return data.raw?.toFixed(1)
              } else {
                return data.raw?.toFixed(2)
              }
            }
          }
        },

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
    labels: stock.priceAction
      .filter(period => Number(period.date.split('-')[0]) > currentYear - Number(periods))
      .map((period, index) => index % timeframe === 0 ? period.date : null)
      .filter(obj => obj !== null),
    datasets: metrics.map(metric => {
      if (valuationState[metric.id]) {
        return {
          label: metric.label,
          type: 'line',
          data: stock.priceAction
            .filter(period => Number(period.date.split('-')[0]) > currentYear - Number(periods))
            .map((period, index) => index % timeframe === 0 ? period[metric.id] : null)
            .filter(obj => obj !== null),
          backgroundColor: metric.color,
          borderColor: metric.color,
          yAxisID: metric.yAxis,
          pointRadius: 0,
          borderWidth: 2.5,


        }
      } else {
        return null
      }
    }).filter(obj => obj !== null)
  })

  useEffect(() => {

    setChartData({
      labels: stock.priceAction
        .filter(period => Number(period.date.split('-')[0]) > currentYear - Number(periods))
        .map((period, index) => index % timeframe === 0 ? period.date : null)
        .filter(obj => obj !== null),
      datasets: metrics.map(metric => {
        if (valuationState[metric.id]) {
          return {
            label: metric.label,
            type: 'line',
            data: stock.priceAction
              .filter(period => Number(period.date.split('-')[0]) > currentYear - Number(periods))
              .map((period, index) => index % timeframe === 0 ? period[metric.id] : null)
              .filter(obj => obj !== null),
            backgroundColor: metric.color,
            borderColor: metric.color,
            yAxisID: metric.yAxis,
            pointRadius: 0,
            borderWidth: 2.5,

          }
        } else {
          return null
        }
      }).filter(obj => obj !== null)
    })

  }, [periods, valuationState])

  useEffect(() => {

    ['y1', 'y2', 'y3', 'y4', 'y5', 'y6'].forEach(y => {

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
              min: result.lowest - 1,
              max: result.highest,
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
        <div style={{ marginTop: `${window.innerWidth < 2000 ? '0px' : '50px'}`, height: `${window.innerWidth < 2000 ? '36rem' : '55rem'}` }} className="chart">
          <Chart data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  )
}
