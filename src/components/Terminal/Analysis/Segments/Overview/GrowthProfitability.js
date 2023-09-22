import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Chart from '../../Chart'

export default function GrowthProfitability({ stock }) {
  const navigate = useNavigate()

  let revenueArr = []
  let netIncomeArr = []
  let marginArr = []

  const reportDates = Object.keys(stock.fundamentals.financialStatements.Income_Statement.yearly)
  const reportYears = []
  reportDates.forEach(date => {
    reportYears.push(date.split('-')[0])
  })
  const formattedReportYears = reportYears.slice(0, 10).reverse()


  Object.values(stock.fundamentals.financialStatements.Income_Statement.yearly).forEach(report => {
    revenueArr.push(Number(report.totalRevenue))
    netIncomeArr.push(Number(report.netIncome))
  })
  Object.values(stock.fundamentals.financialStatements.Statistics.yearly).forEach(report => {
    marginArr.push(Number(report.netMargin))

  })
  revenueArr = revenueArr.slice(0, 10).reverse()
  netIncomeArr = netIncomeArr.slice(0, 10).reverse()
  marginArr = marginArr.slice(0, 10).reverse()

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

  useEffect(() => {
    setChartData({
      labels: formattedReportYears.map(year => year),
      datasets: [
        {
          label: 'Net Margin',
          type: 'line',
          data: marginArr.map(num => num),
          backgroundColor: '#FBC02D',
          borderColor: '#FBC02D',
          yAxisID: 'y2',
          barPercentage: .85,
          borderRadius: 5,
        },
        {
          label: 'Revenue',
          type: 'bar',
          data: revenueArr.map(num => num),
          backgroundColor: '#448AFF',
          borderColor: '#448AFF',
          yAxisID: 'y1',
          barPercentage: .85,
          borderRadius: 5,
        },
        {
          label: 'Net Income',
          type: 'bar',
          data: netIncomeArr.map(num => num),
          backgroundColor: '#4DD0E1',
          borderColor: '#4DD0E1',
          yAxisID: 'y1',
          barPercentage: .85,
          borderRadius: 5,
        },

      ]
    })
  }, [stock])

  useEffect(() => {
    if (chartData) {
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
            max: result.highest + (result.highest * .05),
            min: result.lowest - (result.highest * .05),
          }
        }
      }));
    }

  }, [chartData])


  if (chartData) {
    return (
      <div style={{ width: '1150px', height: sizes.height, textAlign: 'center' }}>
        <h3 style={{ textAlign: 'center', fontSize: sizes.titleSize, margin: '0', marginBottom: sizes.titleMargin }}>Growth & Profitablilty</h3>
        <div style={{ backgroundColor: 'var(--green-middark)', width: sizes.boxWidth, height: '88%', display: 'inline-block', borderRadius: '10px', cursor: 'pointer' }} onClick={() => navigate(`/terminal/analysis/${stock.ticker}/statements`)}>
          <div style={{ height: '90%', marginTop: '25px', width: '97.5%', marginLeft: '13px' }}>
            <Chart data={chartData} options={chartOptions} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
          <div style={{ textAlign: 'center', width: '190px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ height: '20px', width: '20px', backgroundColor: '#448AFF', borderRadius: '2px' }}></div>
              </div>
              <p style={{ fontWeight: '500', fontSize: sizes.textSize, margin: '0' }}>Revenue</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', width: '190px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ height: '20px', width: '20px', backgroundColor: '#4DD0E1', borderRadius: '2px' }}></div>
              </div>
              <p style={{ fontWeight: '500', fontSize: sizes.textSize, margin: '0' }}>Net Income</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', width: '190px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ height: '20px', width: '20px', backgroundColor: '#FBC02D', borderRadius: '2px' }}></div>
              </div>
              <p style={{ fontWeight: '500', fontSize: sizes.textSize, margin: '0' }}>Profit Margin (%)</p>
            </div>
          </div>
        </div>

      </div>
    )
  }

}
