import React, { useState } from 'react'
import { dcf } from '../../../../../api'

import '../../../../../css/terminal/dcf.css'

export default function Dcf({ stock, periods }) {

  const [dcfResults, setDcfResults] = useState({})

  const initialState = {
    growthRate: '',
    profitMargin: '',
    freeCashflowMargin: '',
    earningsMultiple: '',
    freeCashflowMultiple: '',
    desiredAnnualReturn: '',
    marginOfsafety: ''
  }
  const [formData, setFormdata] = useState(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await dcf(formData, stock.ticker, periods)
    setDcfResults({
      stockPrice: data.stockPrice,
      MOSstockPrice: data.MOSstockPrice,
      currentStockPrice: data.currentStockPrice,
      futureStockPrice: data.futureStockPrice,
      CAGR: data.CAGR
    })
    // if (isLogin) {
    //   dispatch(login(formData, navigate, path))
    // } else {
    //   dispatch(register(formData, navigate, path))
    // }
  }

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='dcf-container'>
      <div className='dcf'>
        <h2 style={{ textAlign: 'center', fontSize: '35px' }}>DCF for {periods} years</h2>
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <label>Growth Rate</label>
            <div className='averages'>
              <div>10 year: { }</div>
              <div>5 year: { }</div>
              <div>1 year: { }</div>
            </div>
            <div className='input-with-percent'>
              <input onChange={handleChange} type='number' name='growthRate' required />
              <span className='percent-symbol'>%</span>
            </div>
          </div>
          <div className='input-container'>
            <label>Profit Margin</label>
            <div className='averages'>
              <div>10 year: { }</div>
              <div>5 year: { }</div>
              <div>1 year: { }</div>
            </div>
            <div className='input-with-percent'>
              <input onChange={handleChange} type='number' name='profitMargin' required />

              <span className='percent-symbol'>%</span>
            </div>
          </div>
          <div className='input-container'>
            <label>Free Cash Flow Margin</label>
            <div className='averages'>
              <div>10 year: { }</div>
              <div>5 year: { }</div>
              <div>1 year: { }</div>
            </div>
            <div className='input-with-percent'>
              <input onChange={handleChange} type='number' name='freeCashflowMargin' required />

              <span className='percent-symbol'>%</span>
            </div>
          </div>
          <div className='input-container'>
            <label>Earnings Multiple</label>
            <div className='averages'>
              <div>10 year: { }</div>
              <div>5 year: { }</div>
              <div>1 year: { }</div>
            </div>
            <div className='input-with-percent'>
              <input onChange={handleChange} type='number' name='earningsMultiple' required />


              <span className='percent-symbol'>x</span>
            </div>

          </div>
          <div className='input-container'>
            <label>Free Cash Flow Multiple</label>
            <div className='averages'>
              <div>10 year: { }</div>
              <div>5 year: { }</div>
              <div>1 year: { }</div>
            </div>
            <div className='input-with-percent'>
              <input onChange={handleChange} type='number' name='freeCashflowMultiple' required />

              <span className='percent-symbol'>x</span>
            </div>

          </div>
          <div className='input-container'>
            <label>Desired Annual Return</label>
            <div className='averages'>
              <div>10 year: { }</div>
              <div>5 year: { }</div>
              <div>1 year: { }</div>
            </div>
            <div className='input-with-percent'>

              <input onChange={handleChange} type='number' name='desiredAnnualReturn' required />

              <span className='percent-symbol'>%</span>
            </div>
          </div>
          <div className='input-container'>
            <label>Margin of Safety</label>
            <div className='averages'>
              <div>10 year: { }</div>
              <div>5 year: { }</div>
              <div>1 year: { }</div>
            </div>
            <div className='input-with-percent'>

              <input onChange={handleChange} type='number' name='marginOfsafety' required />

              <span className='percent-symbol'>%</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '15px 0' }}>
            <button type='submit'>Calculate</button>

          </div>
        </form>

      </div>
      <h2 style={{ color: 'white' }}>{dcfResults.stockPrice ? `$${dcfResults.stockPrice?.toFixed(0)}` : ''}</h2>
    </div>
  )
}
