import React, { useEffect, useState } from 'react'
import { Outlet, Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import '../../css/terminal/header.css'
import '../../css/colors.css'


import overview_png from '../../logos/overview.png'
import statements_png from '../../logos/statements.png'
import valuation_png from '../../logos/valuation.png'
import dividends_png from '../../logos/dividends.png'
import buybacks_png from '../../logos/buybacks.png'
import competition_png from '../../logos/competition.png'
import segments_png from '../../logos/segments.png'
import forecasts_png from '../../logos/forecasts.png'
import shorts_png from '../../logos/shorts.png'
import insider_png from '../../logos/insider.png'
import management_png from '../../logos/management.png'
import shareholders_png from '../../logos/shareholders.png'
import secFilings_png from '../../logos/secFilings.png'
import export_png from '../../logos/export.png'

import screener_png from '../../logos/screener.png'


export default function Header({ mode }) {
  const navigate = useNavigate()
  const location = useLocation();
  const { id } = useParams()

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


  const pathnameSegments = location.pathname.split('/');
  const segment = pathnameSegments[pathnameSegments.length - 1];

  useEffect(() => {
    if (location.pathname === '/terminal/analysis') {
      navigate(`/terminal/analysis/AAPL/overview`);
    } else if (location.pathname === `/terminal/analysis/${id}`) {
      navigate(`/terminal/analysis/${id}/overview`);
    }
  }, [location.pathname, navigate]);


  const handleClick = (path) => {
    if (mode == 'analysis') {
      navigate(`/terminal/${mode}/${id}/${path}`)
    } else {
      navigate(`/terminal/${mode}/${path}`)
    }

  }

  return (
    <>
      <div className="terminal-header">
        <div className="logo">
          <h1>Fundamenta</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: `${window.innerWidth - 60}px` }}>
          <div className="header-icon-segments">
            {mode == 'analysis' ?
              <>
                <div style={segment == 'overview' ? { backgroundColor: 'var(--green-light)', padding: '8.5px 13px' } : { padding: '8.5px 13px' }} onClick={() => handleClick('overview')} className="header-icon">
                  <img style={{ height: '20px' }} className='segment-logo' src={overview_png} />
                  <p>Overview</p>
                </div>
                <div style={segment == 'statements' ? { backgroundColor: 'var(--green-light)' } : {}} onClick={() => handleClick('statements')} className="header-icon">
                  <img className='segment-logo' src={statements_png} />
                  <p>Statements</p>
                </div>
                <div style={segment == 'valuation' ? { backgroundColor: 'var(--green-light)' } : {}} onClick={() => handleClick('valuation')} className="header-icon">
                  <img className='segment-logo' src={valuation_png} />
                  <p>Valuation</p>
                </div>
                <div style={segment == 'dividends' ? { backgroundColor: 'var(--green-light)' } : {}} onClick={() => handleClick('dividends')} className="header-icon">
                  <img className='segment-logo' src={dividends_png} />
                  <p>Dividends</p>
                </div>
                <div style={segment == 'buybacks' ? { backgroundColor: 'var(--green-light)' } : {}} onClick={() => handleClick('buybacks')} className="header-icon">
                  <img className='segment-logo' src={buybacks_png} />
                  <p>Buybacks</p>
                </div>
                <div style={segment == 'competition' ? { backgroundColor: 'var(--green-light)' } : {}} onClick={() => handleClick('competition')} className="header-icon">
                  <img className='segment-logo' src={competition_png} />
                  <p>Competition</p>
                </div>
                {/* <div style={segment == 'segments' ? { backgroundColor: 'var(--green-light)' } : {}} onClick={() => handleClick('segments')} className="header-icon">
                  <img className='segment-logo' src={segments_png} />
                  <p>Segments</p>
                </div>
                <div style={segment == 'forecasts' ? { backgroundColor: 'var(--green-light)' } : {}} onClick={() => handleClick('forecasts')} className="header-icon">
                  <img className='segment-logo' src={forecasts_png} />
                  <p>Forecasts</p>
                </div>
                <div style={segment == 'shorts' ? { backgroundColor: 'var(--green-light)' } : {}} onClick={() => handleClick('shorts')} className="header-icon">
                  <img className='segment-logo' src={shorts_png} />
                  <p>Shorts</p>
                </div> */}
                <div style={segment == 'insider' ? { backgroundColor: 'var(--green-light)' } : {}} onClick={() => handleClick('insider')} className="header-icon">
                  <img className='segment-logo' src={insider_png} />
                  <p>Insider</p>
                </div>
                <div style={segment == 'management' ? { backgroundColor: 'var(--green-light)' } : {}} onClick={() => handleClick('management')} className="header-icon">
                  <img className='segment-logo' src={management_png} />
                  <p>Management</p>
                </div>
                <div style={segment == 'shareholders' ? { backgroundColor: 'var(--green-light)' } : {}} onClick={() => handleClick('shareholders')} className="header-icon">
                  <img className='segment-logo' src={shareholders_png} />
                  <p>Shareholders</p>
                </div>
                <div style={segment == 'sec-filings' ? { backgroundColor: 'var(--green-light)' } : {}} onClick={() => handleClick('sec-filings')} className="header-icon">
                  <img className='segment-logo' src={secFilings_png} />
                  <p>SEC Filings</p>
                </div>
                <div style={segment == 'export' ? { backgroundColor: 'var(--green-light)' } : {}} onClick={() => handleClick('export')} className="header-icon">
                  <img className='segment-logo' src={export_png} />
                  <p>Export Data</p>
                </div>
              </>
              :
              <div style={segment == 'screener' ? { backgroundColor: 'var(--green-light)' } : {}} className="header-icon">
                <img className='segment-logo' src={screener_png} />
                <p>Screener</p>
              </div>
            }

          </div>
          <div className='user-part' style={{ textAlign: 'center', marginRight: '30px' }}>
            <h2 style={{ marginBottom: '2px', marginTop: '8px', fontSize: '18px' }}>{user.result.name}</h2>
            <h2 style={{
              marginTop: '0',
              fontSize: '14px',
              display: 'inline-block',
              padding: '1px 10px',
              borderRadius: '3px',
              color: 'black',
              backgroundColor: `var(--tier-${user.result.tier.split(' ')[0].toLowerCase()})`
            }}>{user.result.tier.split(' ')[0]}</h2>
          </div>
        </div>

      </div>
      <Outlet />
    </>

  )
}
