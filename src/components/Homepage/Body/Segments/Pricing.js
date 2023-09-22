import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'
import { animateScroll as scroll } from "react-scroll";

import { getMonthlyAnnually } from '../../../../actions/pricing'

import checkmark_png from '../../../../logos/checkmark.png'
import cross_png from '../../../../logos/cross.png'
import premiumBackground from '../../../../logos/premium.jpg'

import '../../../../css/homepage/segments.css'
import '../../../../css/colors.css'

import { getProductAndPrice, stripeTest, cancelSubscription } from '../../../../api'
import { getRecentUser } from '../../../../actions/auth'



export default function Pricing({ moreInfo }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [monthlyAnnually, setMonthlyAnnually] = useState('monthly')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleBuy(price_id) {

    // const productPrice = price * 100
    // const productId = id
    // const { data } = await getProductAndPrice(productId, productPrice)
    const urlData = await stripeTest(price_id, user.result?._id)
    dispatch(getRecentUser(user.result))
    window.location.replace(urlData.data.url)
    // update user for recent tier change
  }

  async function handelCancelSubscription() {
    // confirm
    await cancelSubscription(user.result?._id)
    dispatch(getRecentUser(user.result))
    window.location.replace('/')
  }

  // useEffect(() => {
  //   dispatch(getMonthlyAnnually(monthlyAnnually))
  // }, [monthlyAnnually])

  return (
    <div id="pricing" className="pricing-container" style={moreInfo ? { marginTop: '0px', width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column' } : {}}>
      <h2>Pricing</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '26px' }}>
        <div onClick={() => setMonthlyAnnually('monthly')} className="monthly-annually" style={monthlyAnnually == 'monthly' ? { backgroundColor: 'var(--green-middle)' } : {}}>
          Monthly
        </div>
        <div onClick={() => setMonthlyAnnually('annually')} className="monthly-annually" style={monthlyAnnually == 'annually' ? { backgroundColor: 'var(--green-middle)' } : {}}>
          Annually
        </div>
      </div>
      <div style={moreInfo ? { width: '18%' } : {}} className="pricing-options">

        {/* <div className="pricing-option" >
          <h3 className='tier' style={{
            color: 'black',
            backgroundColor: 'var(--tier-pro)',
            display: 'inline-block',
            padding: '3px 45px',
            borderRadius: '10px',
          }}>Pro</h3>
          <p className="price">{monthlyAnnually == 'monthly' ? '$10' : '$80'}</p>
          <p className="month">{monthlyAnnually == 'monthly' ? '/month' : '/year'}</p>
          {monthlyAnnually == 'annually' ?
            <div className="sale">
              <p style={{ margin: '0', marginTop: '10px', marginBottom: '5px', fontSize: '20px', fontWeight: '500', color: 'rgba(255, 255, 50, 1)' }}>Save 33%</p>
              <p style={{ margin: '0', marginBottom: '10px', fontSize: '20px', fontWeight: '500' }}>$7 /month</p>
            </div>
            :
            ''}
          {user ?
            user.result?.tier != 'Pro Plan' ?

              < div onClick={() => {
                if (monthlyAnnually == 'annually') {
                  handleBuy(`${process.env.REACT_APP_NEXT_ANNUALLY_PRO_PRICE_ID}`)

                } else {
                  handleBuy(`${process.env.REACT_APP_NEXT_MONTHLY_PRO_PRICE_ID}`)
                }
              }} style={monthlyAnnually == 'annually' ? { marginTop: '77px' } : {}} className="buy-button">
                {user.result?.tier == 'Premium Plan' || user.result?.tier == 'Ultimate Plan' ? 'Downgrade' : 'Buy'}
              </div>
              :
              < div onClick={() => {
                handelCancelSubscription()
              }} style={monthlyAnnually == 'annually' ? { marginTop: '77px' } : {}} className="buy-button">
                Cancel
              </div>
            :
            <Link to='/auth' state={'/pricing'}
              style={monthlyAnnually == 'annually' ? { marginTop: '77px', textDecoration: 'none', color: 'white' } : { textDecoration: 'none', color: 'white' }} className="buy-button">
              Buy
            </Link>
          }

        </div> */}
        <div className="pricing-option">
          <h3 className='tier' style={{
            color: 'black',
            backgroundImage: `url(${premiumBackground})`,
            backgroundSize: 'cover', // Make the image fit within the div
            backgroundRepeat: 'no-repeat', // Prevent image repetition
            display: 'inline-block',
            padding: '3px 45px',
            borderRadius: '10px',
          }}>Premium</h3>
          <p className="price">{monthlyAnnually == 'monthly' ? '$15' : '$120'}</p>
          <p className="month">{monthlyAnnually == 'monthly' ? '/month' : '/year'}</p>
          {monthlyAnnually == 'annually' ?
            <div className="sale">
              <p style={{ margin: '0', marginTop: '10px', marginBottom: '5px', fontSize: '20px', fontWeight: '500', color: 'rgba(255, 255, 50, 1)' }}>Save 33%</p>
              <p style={{ margin: '0', marginBottom: '10px', fontSize: '20px', fontWeight: '500' }}>$13 /month</p>
            </div>
            :
            ''}

          {user ?
            user.result?.tier != 'Premium Plan' ?

              < div onClick={() => {
                if (monthlyAnnually == 'annually') {
                  handleBuy(`${process.env.REACT_APP_NEXT_ANNUALLY_PREMIUM_PRICE_ID}`)

                } else {
                  handleBuy(`${process.env.REACT_APP_NEXT_MONTHLY_PREMIUM_PRICE_ID}`)
                }
              }} style={monthlyAnnually == 'annually' ? { marginTop: '77px' } : {}} className="buy-button">
                {user.result?.tier == 'Pro Plan' ? 'Upgrade' : user.result?.tier == 'Ultimate Plan' ? 'Downgrade' : 'Buy'}
              </div>
              :
              < div onClick={() => {
                handelCancelSubscription()
              }} style={monthlyAnnually == 'annually' ? { marginTop: '77px' } : {}} className="buy-button">
                Cancel
              </div>
            :
            <Link to='/auth' state={'/pricing'}
              style={monthlyAnnually == 'annually' ? { marginTop: '77px', textDecoration: 'none', color: 'white' } : { textDecoration: 'none', color: 'white' }} className="buy-button">
              Buy
            </Link>
          }
        </div>

        {/* <div className="pricing-option">
          <h3 className='tier' style={{
            color: 'black',
            backgroundColor: 'var(--tier-ultimate)',
            display: 'inline-block',
            padding: '3px 45px',
            borderRadius: '10px',
          }}>Ultimate</h3>
          <p className="price">{monthlyAnnually == 'monthly' ? '$50' : '$400'}</p>
          <p className="month">{monthlyAnnually == 'monthly' ? '/month' : '/year'}</p>
          {monthlyAnnually == 'annually' ?
            <div className="sale">
              <p style={{ margin: '0', marginTop: '10px', marginBottom: '5px', fontSize: '20px', fontWeight: '500', color: 'rgba(255, 255, 50, 1)' }}>Save 33%</p>
              <p style={{ margin: '0', marginBottom: '10px', fontSize: '20px', fontWeight: '500' }}>$33 /month</p>
            </div>
            :
            ''}

          {user ?
            user.result?.tier != 'Ultimate Plan' ?

              < div onClick={() => {
                if (monthlyAnnually == 'annually') {
                  handleBuy(`${process.env.REACT_APP_NEXT_ANNUALLY_ULTIMATE_PRICE_ID}`)

                } else {
                  handleBuy(`${process.env.REACT_APP_NEXT_MONTHLY_ULTIMATE_PRICE_ID}`)
                }
              }} style={monthlyAnnually == 'annually' ? { marginTop: '77px' } : {}} className="buy-button">
                {user.result?.tier == 'Premium Plan' || user.result?.tier == 'Pro Plan' ? 'Upgrade' : 'Buy'}
              </div>
              :
              < div onClick={() => {
                handelCancelSubscription()
              }} style={monthlyAnnually == 'annually' ? { marginTop: '77px' } : {}} className="buy-button">
                Cancel
              </div>
            :
            <Link to='/auth' state={'/pricing'}
              style={monthlyAnnually == 'annually' ? { marginTop: '77px', textDecoration: 'none', color: 'white' } : { textDecoration: 'none', color: 'white' }} className="buy-button">
              Buy
            </Link>
          }
        </div> */}
      </div>
      {
        !moreInfo ? (
          <div onClick={() => navigate('/pricing')} style={{ marginTop: '50px', padding: '15px 150px' }} className="buy-button">
            More Info
          </div>
        ) : (
          ''
        )
      }

      {
        moreInfo ? (
          <div className="compare-pricing">
            <p style={{ fontSize: '55px', fontWeight: 'bold', marginTop: '30px' }}>Compare Plans</p>
            <table>
              <thead>
                <tr>
                  <td></td>
                  <td>Free</td>

                  <td>Premium</td>
                  <td></td>

                </tr>

              </thead>
              <tbody>
                <tr className='subHeader'>
                  <td>Analysis</td>
                  <td></td>
                  <td></td>
                  <td></td>

                </tr>
                <tr className='not-subHeader'>
                  <td>Overview</td>
                  <td><img className='checkmark-logo' src={checkmark_png} /></td>
                  <td><img className='checkmark-logo' src={checkmark_png} /></td>
                  <td></td>

                </tr>
                <tr className='not-subHeader'>
                  <td>Statements</td>
                  <td><img className='checkmark-logo' src={checkmark_png} /></td>
                  <td><img className='checkmark-logo' src={checkmark_png} /></td>
                  <td></td>

                </tr>
                <tr className='not-subHeader'>
                  <td>Valuation</td>
                  <td><img className='checkmark-logo' src={checkmark_png} /></td>
                  <td><img className='checkmark-logo' src={checkmark_png} /></td>
                  <td></td>

                </tr>
                <tr className='not-subHeader'>
                  <td>Dividends</td>
                  <td><img className='checkmark-logo' src={checkmark_png} /></td>
                  <td><img className='checkmark-logo' src={checkmark_png} /></td>
                  <td></td>

                </tr>
                <tr className='not-subHeader'>
                  <td>Buybacks</td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td><img className='checkmark-logo' src={checkmark_png} /></td>
                  <td></td>

                </tr>
                <tr className='not-subHeader'>
                  <td>Competition</td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td></td>

                </tr>
                <tr className='not-subHeader'>
                  <td>Segments</td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td></td>

                </tr>
                <tr className='not-subHeader'>
                  <td>Forecasts</td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td><img className='checkmark-logo' src={checkmark_png} /></td>
                  <td></td>

                </tr>
                <tr className='not-subHeader'>
                  <td>Shorts</td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td></td>

                </tr>
                <tr className='not-subHeader'>
                  <td>Insider</td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td></td>

                </tr>
                <tr className='not-subHeader'>
                  <td>Management</td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td></td>

                </tr>
                <tr className='not-subHeader'>
                  <td>Shareholders</td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td></td>

                </tr>
                <tr className='not-subHeader'>
                  <td>SEC Filings</td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td><img className='checkmark-logo' src={checkmark_png} /></td>
                  <td></td>

                </tr>
                <tr className='not-subHeader'>
                  <td>Export Data</td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td><img className='checkmark-logo' src={checkmark_png} /></td>
                  <td></td>

                </tr>

                <tr className='subHeader'>
                  <td>Screener</td>
                  <td></td>
                  <td></td>
                  <td></td>

                </tr>
                <tr className='not-subHeader'>
                  <td>Customize Screener</td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td><img className='checkmark-logo' src={checkmark_png} /></td>
                  <td></td>

                </tr>
                <tr className='not-subHeader'>
                  <td>Export Data</td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td><img className='checkmark-logo' src={checkmark_png} /></td>
                  <td></td>

                </tr>
                <tr className='subHeader'>
                  <td>Api</td>
                  <td></td>
                  <td></td>
                  <td></td>

                </tr>
                <tr className='not-subHeader'>
                  <td>Full Api</td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td><img className='cross-logo' src={cross_png} /></td>
                  <td></td>

                </tr>

              </tbody>
            </table>
          </div>
        ) : (
          ''
        )
      }

    </div >
  )
}
