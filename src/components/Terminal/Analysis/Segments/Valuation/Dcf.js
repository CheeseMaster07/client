import React, { useState } from 'react'
import { dcf } from '../../../../../api'

import '../../../../../css/terminal/dcf.css'

export default function Dcf({ stock, periods }) {

  const [dcfResults, setDcfResults] = useState({})

  const initialState = {
    bear: {
      growthRate: '',
      profitMargin: '',
      freeCashflowMargin: '',
      earningsMultiple: '',
      freeCashflowMultiple: '',
      desiredAnnualReturn: '',
      marginOfsafety: ''
    },
    neutral: {
      growthRate: '',
      profitMargin: '',
      freeCashflowMargin: '',
      earningsMultiple: '',
      freeCashflowMultiple: '',
      desiredAnnualReturn: '',
      marginOfsafety: ''
    },
    bull: {
      growthRate: '',
      profitMargin: '',
      freeCashflowMargin: '',
      earningsMultiple: '',
      freeCashflowMultiple: '',
      desiredAnnualReturn: '',
      marginOfsafety: ''
    },

  }
  const [formData, setFormdata] = useState(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await dcf(formData, stock.ticker, periods)
    setDcfResults({
      bearCase: data.bearCase,
      neutralCase: data.neutralCase,
      bullCase: data.bullCase
    })
    // if (isLogin) {
    //   dispatch(login(formData, navigate, path))
    // } else {
    //   dispatch(register(formData, navigate, path))
    // }
  }
  // console.log(dcfResults)

  const handleChange = (scenario, e) => {
    setFormdata({ ...formData, [scenario]: { ...formData[scenario], [e.target.name]: e.target.value } })
  }

  return (
    <div className='dcf-container'>
      <div className='dcf'>
        <h2 style={{ textAlign: 'center', fontSize: '35px' }}>DCF for {periods} years</h2>
        <div className='form-header' style={{ display: 'flex', marginLeft: '50%', marginBottom: '2px', width: '50%', justifyContent: 'space-between' }}>
          <div style={{ marginLeft: '-234px' }}>
            <p>Averages</p>
            <div className='line'></div>
            <div style={{ display: 'flex', gap: '69px' }}>
              <p style={{ width: '90px' }}>10 years</p>
              <p style={{ width: '90px' }}>5 years</p>
              <p style={{ width: '90px' }}>1 year</p>
            </div>
          </div>
          <div style={{ marginRight: '35px' }}>
            <p>Scenarios</p>
            <div className='line'></div>
            <div style={{ display: 'flex', gap: '34px' }}>
              <p>Bear</p>
              <p>Neutral</p>
              <p>Bull</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <label>Growth Rate</label>
            <div className='averages'>
              <div>{`${stock.fundamentals.dcf.growth.tenYears.toFixed(1)}%`}</div>
              <div>{`${stock.fundamentals.dcf.growth.fiveYears.toFixed(1)}%`}</div>
              <div>{`${stock.fundamentals.dcf.growth.oneYear.toFixed(1)}%`}</div>
            </div>
            <div className='input-fields'>
              <div className='input-with-percent'>
                <input onChange={(e) => handleChange('bear', e)} type='number' name='growthRate' required />
                <span className='percent-symbol'>%</span>
              </div>
              <div className='input-with-percent'>
                <input onChange={(e) => handleChange('neutral', e)} type='number' name='growthRate' required />
                <span className='percent-symbol'>%</span>
              </div>
              <div className='input-with-percent'>
                <input onChange={(e) => handleChange('bull', e)} type='number' name='growthRate' required />
                <span className='percent-symbol'>%</span>
              </div>
            </div>

          </div>
          <div className='input-container'>
            <label>Profit Margin</label>
            <div className='averages'>
              <div>{`${(stock.fundamentals.dcf.profitMargin.tenYears * 100).toFixed(1)}%`}</div>
              <div>{`${(stock.fundamentals.dcf.profitMargin.fiveYears * 100).toFixed(1)}%`}</div>
              <div>{`${(stock.fundamentals.dcf.profitMargin.oneYear * 100).toFixed(1)}%`}</div>
            </div>
            <div className='input-fields'>
              <div className='input-with-percent'>
                <input onChange={(e) => handleChange('bear', e)} type='number' name='profitMargin' step=".1" required />

                <span className='percent-symbol'>%</span>
              </div>            <div className='input-with-percent'>
                <input onChange={(e) => handleChange('neutral', e)} type='number' name='profitMargin' step=".1" required />

                <span className='percent-symbol'>%</span>
              </div>            <div className='input-with-percent'>
                <input onChange={(e) => handleChange('bull', e)} type='number' name='profitMargin' step=".1" required />

                <span className='percent-symbol'>%</span>
              </div>
            </div>

          </div>
          <div className='input-container'>
            <label>Free Cash Flow Margin</label>
            <div className='averages'>
              <div>{`${(stock.fundamentals.dcf.freeCashflowMargin.fiveYears * 100).toFixed(1)}%`}</div>
              <div>{`${(stock.fundamentals.dcf.freeCashflowMargin.fiveYears * 100).toFixed(1)}%`}</div>
              <div>{`${(stock.fundamentals.dcf.freeCashflowMargin.fiveYears * 100).toFixed(1)}%`}</div>
            </div>
            <div className='input-fields'>
              <div className='input-with-percent'>
                <input onChange={(e) => handleChange('bear', e)} type='number' name='freeCashflowMargin' step=".1" required />

                <span className='percent-symbol'>%</span>
              </div>            <div className='input-with-percent'>
                <input onChange={(e) => handleChange('neutral', e)} type='number' name='freeCashflowMargin' step=".1" required />

                <span className='percent-symbol'>%</span>
              </div>            <div className='input-with-percent'>
                <input onChange={(e) => handleChange('bull', e)} type='number' name='freeCashflowMargin' step=".1" required />

                <span className='percent-symbol'>%</span>
              </div>
            </div>

          </div>
          <div className='input-container'>
            <label>Earnings Multiple</label>
            <div className='averages'>
              <div>{`${stock.fundamentals.dcf.earningsMultiple.tenYears?.toFixed(1)}`}</div>
              <div>{`${stock.fundamentals.dcf.earningsMultiple.fiveYears?.toFixed(1)}`}</div>
              <div>{`${stock.fundamentals.dcf.earningsMultiple.oneYear?.toFixed(1)}`}</div>
            </div>
            <div className='input-fields'>
              <div className='input-with-percent'>
                <input onChange={(e) => handleChange('bear', e)} type='number' name='earningsMultiple' required />
                <span className='percent-symbol'>x</span>
              </div>
              <div className='input-with-percent'>
                <input onChange={(e) => handleChange('neutral', e)} type='number' name='earningsMultiple' required />
                <span className='percent-symbol'>x</span>
              </div>
              <div className='input-with-percent'>
                <input onChange={(e) => handleChange('bull', e)} type='number' name='earningsMultiple' required />
                <span className='percent-symbol'>x</span>
              </div>
            </div>


          </div>
          <div className='input-container'>
            <label>Free Cash Flow Multiple</label>
            <div className='averages'>
              <div>{`${stock.fundamentals.dcf.freeCashflowMultiple.tenYears?.toFixed(1)}`}</div>
              <div>{`${stock.fundamentals.dcf.freeCashflowMultiple.fiveYears?.toFixed(1)}`}</div>
              <div>{`${stock.fundamentals.dcf.freeCashflowMultiple.oneYear?.toFixed(1)}`}</div>
            </div>
            <div className='input-fields'>
              <div className='input-with-percent'>
                <input onChange={(e) => handleChange('bear', e)} type='number' name='freeCashflowMultiple' required />
                <span className='percent-symbol'>x</span>
              </div>
              <div className='input-with-percent'>
                <input onChange={(e) => handleChange('neutral', e)} type='number' name='freeCashflowMultiple' required />
                <span className='percent-symbol'>x</span>
              </div>
              <div className='input-with-percent'>
                <input onChange={(e) => handleChange('bull', e)} type='number' name='freeCashflowMultiple' required />
                <span className='percent-symbol'>x</span>
              </div>
            </div>


          </div>
          <div className='input-container'>
            <label>Desired Annual Return</label>
            <div className='input-fields'>
              <div className='input-with-percent'>
                <input onChange={(e) => handleChange('bear', e)} type='number' name='desiredAnnualReturn' required />
                <span className='percent-symbol'>%</span>
              </div>
              <div className='input-with-percent'>
                <input onChange={(e) => handleChange('neutral', e)} type='number' name='desiredAnnualReturn' required />
                <span className='percent-symbol'>%</span>
              </div>
              <div className='input-with-percent'>
                <input onChange={(e) => handleChange('bull', e)} type='number' name='desiredAnnualReturn' required />
                <span className='percent-symbol'>%</span>
              </div>
            </div>

          </div>
          <div className='input-container'>
            <label>Margin of Safety</label>
            <div className='input-fields'>
              <div className='input-with-percent'>
                <input onChange={(e) => handleChange('bear', e)} type='number' name='marginOfsafety' required />
                <span className='percent-symbol'>%</span>
              </div>
              <div className='input-with-percent'>
                <input onChange={(e) => handleChange('neutral', e)} type='number' name='marginOfsafety' required />
                <span className='percent-symbol'>%</span>
              </div>
              <div className='input-with-percent'>
                <input onChange={(e) => handleChange('bull', e)} type='number' name='marginOfsafety' required />
                <span className='percent-symbol'>%</span>
              </div>
            </div>

          </div>

          <div style={{ textAlign: 'center', padding: '15px 0' }}>
            <button type='submit'>Calculate</button>

          </div>
        </form>

      </div>

      <h2 style={{ color: 'white' }}>{dcfResults.bearCase?.stockPrice ? `$${dcfResults.bearCase?.stockPrice.toFixed(0)}` : ''}</h2>
      <h2 style={{ color: 'white' }}>{dcfResults.neutralCase?.stockPrice ? `$${dcfResults.neutralCase?.stockPrice.toFixed(0)}` : ''}</h2>
      <h2 style={{ color: 'white' }}>{dcfResults.bullCase?.stockPrice ? `$${dcfResults.bullCase?.stockPrice.toFixed(0)}` : ''}</h2>
    </div>
  )
}
