import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'

import { checkTokenExpired, getRecentUser } from './actions/auth'

import Homepage_Header from './components/Homepage/Header'
import Homepage_Body from './components/Homepage/Body/Body'
import Pricing from './components/Homepage/Body/Segments/Pricing'

import Auth from './components/Homepage/Auth'

import Terminal_Header from './components/Terminal/Header'
import Terminal_Sidebar from './components/Terminal/Sidebar'
import Content from './components/Terminal/Analysis/Content';



export default function App() {
  const dispatch = useDispatch()

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


  useEffect(() => {
    dispatch(checkTokenExpired())
    if (user) {
      dispatch(getRecentUser(user.result))
    }
  }, [])

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('terminal') && !user) {
      navigate('/auth');
      window.location.reload()
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (location.pathname === '/terminal' || location.pathname === '/terminal/') {
      navigate('/terminal/analysis');
    }
  }, [location.pathname, navigate]);

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <Routes>
        <Route path="/" element={
          <>
            < Homepage_Header />
          </>

        } >
          <Route path="" element={< Homepage_Body />} />
          <Route path="pricing" element={< Pricing moreInfo={true} />} />
        </Route>
        <Route path="/auth" element={< Auth />} />

        <Route path="/terminal"  >
          <Route path="analysis" element={
            <>
              < Terminal_Header mode={'analysis'} />
              < Terminal_Sidebar mode={'analysis'} />
            </>
          } >
            <Route path=':id'>
              <Route path="overview" element={<Content segment={'overview'} />} />
              <Route path="statements" element={<Content segment={'statements'} />} />
              <Route path="valuation" element={<Content segment={'valuation'} />} />
              <Route path="competition" element={<Content segment={'competition'} />} />
              <Route path="forecasts" element={<Content segment={'forecasts'} />} />
              <Route path="segments" element={<Content segment={'segments'} />} />
              <Route path="insider" element={<Content segment={'insider'} />} />
              <Route path="dividends" element={<Content segment={'dividends'} />} />
              <Route path="shorts" element={<Content segment={'shorts'} />} />
              <Route path="buybacks" element={<Content segment={'buybacks'} />} />
              <Route path="management" element={<Content segment={'management'} />} />
              <Route path="shareholders" element={<Content segment={'shareholders'} />} />
              <Route path="sec-filings" element={<Content segment={'sec-filings'} />} />
              <Route path="export" element={<Content segment={'export'} />} />
            </Route>

          </Route>
          <Route path="screener" element={
            <>
              < Terminal_Header mode={'screener'} />
              < Terminal_Sidebar mode={'screener'} />
            </>
          } />
        </Route>
      </Routes>
    </GoogleOAuthProvider>
  )
}
