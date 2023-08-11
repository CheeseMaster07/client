import React, { useEffect, useState } from 'react'
import { dcf } from '../../../../../api'

import '../../../../../css/terminal/dcf.css'

export default function Dcf({ stock, periods }) {

  const [dcfResults, setDcfResults] = useState({})
  const [showResults, setShowResults] = useState(false)
  const currentStockPrice = stock.priceAction[stock.priceAction.length - 1].adjusted_close

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

  useEffect(() => {
    if (dcfResults.bearCase?.stockPrice) {
      setShowResults(true)
      console.log(dcfResults)
    } else {
      setShowResults(false)
    }
  }, [dcfResults])

  const handleChange = (scenario, e) => {
    setFormdata({ ...formData, [scenario]: { ...formData[scenario], [e.target.name]: e.target.value } })
  }

  function formatLargeNum(num) {
    if (Math.abs(num) >= 1000000000000) {
      return (num / 1000000000000).toFixed(1) + 'T'
    } else if (Math.abs(num) >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (Math.abs(num) >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (Math.abs(num) >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
  }

  return (
    <>
      <div className='dcf-container'>
        <div className='dcf'>
          <h2 style={{ textAlign: 'center', fontSize: '35px', marginTop: '15px', marginBottom: '15px' }}>DCF for {periods} years</h2>
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
                  <input onChange={(e) => handleChange('bear', e)} type='number' name='growthRate' step=".1" required />
                  <span className='percent-symbol'>%</span>
                </div>
                <div className='input-with-percent'>
                  <input onChange={(e) => handleChange('neutral', e)} type='number' name='growthRate' step=".1" required />
                  <span className='percent-symbol'>%</span>
                </div>
                <div className='input-with-percent'>
                  <input onChange={(e) => handleChange('bull', e)} type='number' name='growthRate' step=".1" required />
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
                  <input onChange={(e) => handleChange('bear', e)} type='number' name='earningsMultiple' step=".1" required />
                  <span className='percent-symbol'>x</span>
                </div>
                <div className='input-with-percent'>
                  <input onChange={(e) => handleChange('neutral', e)} type='number' name='earningsMultiple' step=".1" required />
                  <span className='percent-symbol'>x</span>
                </div>
                <div className='input-with-percent'>
                  <input onChange={(e) => handleChange('bull', e)} type='number' name='earningsMultiple' step=".1" required />
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
                  <input onChange={(e) => handleChange('bear', e)} type='number' name='freeCashflowMultiple' step=".1" required />
                  <span className='percent-symbol'>x</span>
                </div>
                <div className='input-with-percent'>
                  <input onChange={(e) => handleChange('neutral', e)} type='number' name='freeCashflowMultiple' step=".1" required />
                  <span className='percent-symbol'>x</span>
                </div>
                <div className='input-with-percent'>
                  <input onChange={(e) => handleChange('bull', e)} type='number' name='freeCashflowMultiple' step=".1" required />
                  <span className='percent-symbol'>x</span>
                </div>
              </div>


            </div>
            <div className='input-container'>
              <label>Desired Annual Return</label>
              <div className='input-fields'>
                <div className='input-with-percent'>
                  <input onChange={(e) => handleChange('bear', e)} type='number' name='desiredAnnualReturn' step=".1" required />
                  <span className='percent-symbol'>%</span>
                </div>
                <div className='input-with-percent'>
                  <input onChange={(e) => handleChange('neutral', e)} type='number' name='desiredAnnualReturn' step=".1" required />
                  <span className='percent-symbol'>%</span>
                </div>
                <div className='input-with-percent'>
                  <input onChange={(e) => handleChange('bull', e)} type='number' name='desiredAnnualReturn' step=".1" required />
                  <span className='percent-symbol'>%</span>
                </div>
              </div>

            </div>
            {/* <div className='input-container'>
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

          </div> */}

            <div style={{ textAlign: 'center', padding: '15px 0' }}>
              <button type='submit'>Calculate</button>
              {/* <p style={{ textAlign: 'center', color: 'white', fontSize: '22px', fontWeight: '500', margin: '10px' }}>Current Share Price: ${currentStockPrice}</p> */}

            </div>
          </form>

        </div>

      </div>
      {showResults ?
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='results-container'>

            <h2 style={{ textAlign: 'center', height: '30px', margin: '0', marginBottom: '10px' }}> </h2>


            <div className='results'>
              <table className='dcf-table'>
                <colgroup>
                  <col className='firstCol' style={{ width: '18.5%', borderRadius: '5px' }}></col>
                  {[1, 2, 3].map(item => {
                    return <col id={item} style={{ width: 'auto' }}></col>
                  })}
                  <col style={{ width: '18.5%' }}></col>

                </colgroup>
                <thead>
                  <tr>
                    <th></th>
                    <th>Bear</th>
                    <th>Neutral</th>
                    <th>Bull</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Implied Share Price</th>
                    <td>{`$${dcfResults.bearCase?.stockPrice.toFixed(0)}`}</td>
                    <td>{`$${dcfResults.neutralCase?.stockPrice.toFixed(0)}`}</td>
                    <td>{`$${dcfResults.bullCase?.stockPrice.toFixed(0)}`}</td>
                    <td></td>
                  </tr>

                  <tr>
                    <th>Implied Upside / Downside</th>
                    <td style={dcfResults.bearCase?.upsideDownside > 0 ? { color: 'var(--growth)' } : { color: 'var(--decline)' }}>
                      {`${dcfResults.bearCase?.upsideDownside.toFixed(1)}%`}</td>
                    <td style={dcfResults.neutralCase?.upsideDownside > 0 ? { color: 'var(--growth)' } : { color: 'var(--decline)' }}>
                      {`${dcfResults.neutralCase?.upsideDownside.toFixed(1)}%`}</td>
                    <td style={dcfResults.bullCase?.upsideDownside > 0 ? { color: 'var(--growth)' } : { color: 'var(--decline)' }}>
                      {`${dcfResults.bullCase?.upsideDownside.toFixed(1)}%`}</td>
                    <td></td>
                  </tr>

                  <tr>
                    <th>CAGR</th>
                    <td style={dcfResults.bearCase?.CAGR > 0 ? { color: 'var(--growth)' } : { color: 'var(--decline)' }}>{`${dcfResults.bearCase?.CAGR.toFixed(1)}%`}</td>
                    <td style={dcfResults.neutralCase?.CAGR > 0 ? { color: 'var(--growth)' } : { color: 'var(--decline)' }}>{`${dcfResults.neutralCase?.CAGR.toFixed(1)}%`}</td>
                    <td style={dcfResults.bullCase?.CAGR > 0 ? { color: 'var(--growth)' } : { color: 'var(--decline)' }}>{`${dcfResults.bullCase?.CAGR.toFixed(1)}%`}</td>
                    <td></td>
                  </tr>


                  <tr>
                    <th>{(new Date().getFullYear())} Return</th>
                    <td >{`${dcfResults.bearCase?.bagger.toFixed(1)}X`}</td>
                    <td >{`${dcfResults.neutralCase?.bagger.toFixed(1)}X`}</td>
                    <td >{`${dcfResults.bullCase?.bagger.toFixed(1)}X`}</td>
                    <td></td>
                  </tr>

                  <tr>
                    <th>{(new Date().getFullYear()) + Number(periods)} Share Price</th>
                    <td>{`$${dcfResults.bearCase?.futureStockPrice.toFixed(0)}`}</td>
                    <td>{`$${dcfResults.neutralCase?.futureStockPrice.toFixed(0)}`}</td>
                    <td>{`$${dcfResults.bullCase?.futureStockPrice.toFixed(0)}`}</td>
                    <td></td>
                  </tr>

                  <tr>
                    <th>{(new Date().getFullYear()) + Number(periods)} Market Cap</th>
                    <td>{`${formatLargeNum(dcfResults.bearCase?.futureMarketCap.toFixed(0))}`}</td>
                    <td>{`${formatLargeNum(dcfResults.neutralCase?.futureMarketCap.toFixed(0))}`}</td>
                    <td>{`${formatLargeNum(dcfResults.bullCase?.futureMarketCap.toFixed(0))}`}</td>
                    <td></td>
                  </tr>

                  <tr>
                    <th>{(new Date().getFullYear()) + Number(periods)} Revenue</th>
                    <td>{`${formatLargeNum(dcfResults.bearCase?.futureRevenue.toFixed(0))}`}</td>
                    <td>{`${formatLargeNum(dcfResults.neutralCase?.futureRevenue.toFixed(0))}`}</td>
                    <td>{`${formatLargeNum(dcfResults.bullCase?.futureRevenue.toFixed(0))}`}</td>
                    <td></td>
                  </tr>

                  <tr>
                    <th>{(new Date().getFullYear()) + Number(periods)} Net Income</th>
                    <td>{`${formatLargeNum(dcfResults.bearCase?.futureNetIncome.toFixed(0))}`}</td>
                    <td>{`${formatLargeNum(dcfResults.neutralCase?.futureNetIncome.toFixed(0))}`}</td>
                    <td>{`${formatLargeNum(dcfResults.bullCase?.futureNetIncome.toFixed(0))}`}</td>
                    <td></td>
                  </tr>

                </tbody>



              </table>

              {/* <p style={{ color: 'white' }}>Bear Case: {dcfResults.bearCase?.stockPrice ? `$${dcfResults.bearCase?.stockPrice.toFixed(0)}` : ''}</p>
          <p style={{ color: 'white' }}>Neutral Case: {dcfResults.neutralCase?.stockPrice ? `$${dcfResults.neutralCase?.stockPrice.toFixed(0)}` : ''}</p>
          <p style={{ color: 'white' }}>Bull Case: {dcfResults.bullCase?.stockPrice ? `$${dcfResults.bullCase?.stockPrice.toFixed(0)}` : ''}</p> */}
            </div>

          </div>
        </div >
        :
        ''}


    </>


  )
}
