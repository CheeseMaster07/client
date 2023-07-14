import React from 'react'
import { useNavigate } from 'react-router-dom'

import '../css/needUpgrading.css';
import '../css/colors.css';

export default function NeedUpgrading({ segment, plan }) {
  const navigate = useNavigate()
  return (
    <div className='need-upgrading' style={{ border: `solid 2px var(--tier-${plan.toLowerCase()})` }}>
      <h2>You need <span style={{
        color: 'black',
        backgroundColor: `var(--tier-${plan.toLowerCase()})`,
        padding: '0 60px',
        borderRadius: '14px',
      }}>{plan}</span> to access {segment}</h2>
      <div onClick={() => navigate('/pricing')} className='upgrade-button'>
        Upgrade Plan
      </div>
    </div>
  )
}
