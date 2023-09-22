import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Chart from '../../Chart'

export default function Shorts({ stock }) {

  let sizes
  if (window.innerWidth < 2000) {
    sizes = {
      titleSize: '28px',
      width: '280px',
      radius: '130px',
      textSize: '18px',
      gap: '0px',
    }
  } else {
    sizes = {
      titleSize: '32px',
      width: '365px',
      radius: '160px',
      textSize: '20px',
      gap: '30px',
    }
  }

  const [chartOptions, setChartOptions] = useState({
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (data) {

            return (data.raw.toFixed(1)) + '%';

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
    const precentShort = Number((stock.fundamentals.technicals.ShortPercent * 100).toFixed(2))
    const precentNotShort = 100 - precentShort
    setChartData({
      labels: ['% Short', 'Shares Outstanding'],
      datasets: [
        {
          label: '% Short',
          data: [precentShort, precentNotShort],
          backgroundColor: [
            '#FBC02D',
            'transparent'
          ],
          borderWidth: 0

        },

      ]
    })
  }, [stock])


  if (chartData) {
    return (
      <div style={{ width: sizes.width, textAlign: 'center' }}>
        <h3 style={{ textAlign: 'center', fontSize: sizes.titleSize, margin: '0', marginBottom: '10px' }}>Shorts</h3>
        <div style={{ display: 'flex', gap: sizes.gap, justifyContent: 'space-evenly' }}>
          <div style={{ backgroundColor: 'var(--green-middark)', width: sizes.radius, height: sizes.radius, display: 'inline-block', borderRadius: '100px' }}>
            <div style={{ height: '100%' }}>
              <Chart data={chartData} options={chartOptions} type={'pie'} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ height: '20px', width: '20px', backgroundColor: '#FBC02D', borderRadius: '2px' }}></div>
              </div>
              <p style={{ fontWeight: '500', fontSize: sizes.textSize }}>Short</p>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
