import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Chart from '../../Chart'

export default function Dividends({ stock }) {
  const navigate = useNavigate()

  let dividendsPerShareArr = []
  let dividendYieldArr = []
  let hasDividends = true

  if (!stock.dividendsData) {
    hasDividends = false
  }


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
              return value?.toFixed(1);
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
                return data.raw?.toFixed(2);
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

  const [chartData, setChartData] = useState()

  if (hasDividends) {
    Object.values(stock.dividendsData.yearly).forEach(report => {
      dividendsPerShareArr.push(Number(report.dividendsPerShare))
      dividendYieldArr.push(Number(report.dividendsYield))
    })


    dividendsPerShareArr = dividendsPerShareArr.reverse().slice(0, 10).reverse()
    dividendYieldArr = dividendYieldArr.reverse().slice(0, 10).reverse()
  }

  const reportDates = Object.keys(stock.fundamentals.financialStatements.Income_Statement.yearly)
  const reportYears = []
  reportDates.forEach(date => {
    reportYears.push(date.split('-')[0])
  })
  const formattedReportYears = reportYears.slice(0, 10).reverse()

  useEffect(() => {
    if (hasDividends) {
      setChartData({
        labels: formattedReportYears.map(year => year),
        datasets: [
          {
            label: 'Dividends Yield',
            type: 'line',
            data: dividendYieldArr.map(num => num),
            backgroundColor: '#4DD0E1',
            borderColor: '#4DD0E1',
            yAxisID: 'y2',
            barPercentage: .85,
            borderRadius: 5,
          },
          {
            label: 'Dividends per Share',
            type: 'bar',
            data: dividendsPerShareArr.map(num => num),
            backgroundColor: '#448AFF',
            borderColor: '#448AFF',
            yAxisID: 'y1',
            barPercentage: .85,
            borderRadius: 5,
          },


        ]
      })
    }
  }, [stock])

  useEffect(() => {
    if (hasDividends && chartData) {
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
            max: result.highest + (result.highest * .1),
            min: result.lowest - (result.highest * .1),
          }
        }
      }));
    }

  }, [chartData])



  let sizes
  if (window.innerWidth < 2000) {
    sizes = {
      titleSize: '30px',
      titleMargin: '12px',
      height: '250px',
      boxWidth: '92%',
      textSize: '18px',

    }
  } else {
    sizes = {
      titleSize: '34px',
      titleMargin: '12px',
      height: '420px',
      boxWidth: '96%',
      textSize: '20px',

    }
  }


  if (!hasDividends) {
    return (
      <div style={{ width: '1150px', height: sizes.height, textAlign: 'center' }}>
        <h3 style={{ textAlign: 'center', fontSize: sizes.titleSize, margin: '0', marginBottom: sizes.titleMargin }}>Dividends</h3>
        <div style={{ backgroundColor: 'var(--green-middark)', width: sizes.boxWidth, height: '88%', display: 'inline-block', borderRadius: '10px', cursor: 'pointer' }} onClick={() => navigate(`/terminal/analysis/${stock.ticker}/dividends`)}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <p style={{ fontWeight: 'bold', fontSize: '35px' }}>{stock.general.Name} does not pay dividends</p>

          </div>
        </div>


      </div>
    )
  }
  if (chartData) {
    return (
      <div style={{ width: '1150px', height: sizes.height, textAlign: 'center' }}>
        <h3 style={{ textAlign: 'center', fontSize: sizes.titleSize, margin: '0', marginBottom: sizes.titleMargin }}>Dividends</h3>
        <div style={{ backgroundColor: 'var(--green-middark)', width: sizes.boxWidth, height: '88%', display: 'inline-block', borderRadius: '10px', cursor: 'pointer' }} onClick={() => navigate(`/terminal/analysis/${stock.ticker}/dividends`)}>
          <div style={{ height: '90%', marginTop: '25px', width: '97.5%', marginLeft: '13px' }}>
            <Chart data={chartData} options={chartOptions} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '90px', marginTop: '10px' }}>
          <div style={{ textAlign: 'center', width: '210px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ height: '20px', width: '20px', backgroundColor: '#448AFF', borderRadius: '2px' }}></div>
              </div>
              <p style={{ fontWeight: '500', fontSize: sizes.textSize, margin: '0' }}>Dividends per Share</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', width: '210px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ height: '20px', width: '20px', backgroundColor: '#4DD0E1', borderRadius: '2px' }}></div>
              </div>
              <p style={{ fontWeight: '500', fontSize: sizes.textSize, margin: '0' }}>Dividends Yield (%)</p>
            </div>
          </div>

        </div>

      </div>
    )
  }

}
