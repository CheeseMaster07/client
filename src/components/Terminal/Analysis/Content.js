import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { getOneStock } from '../../../actions/stocks';

import Overview from './Segments/Overview'
import Statements from './Segments/Statements/Statements'
import Buybacks from './Segments/Buybacks/Buybacks'
import Competition from './Segments/Competition/Competition'
import Dividends from './Segments/Dividends/Dividends'
import Export from './Segments/Export'
import Forecasts from './Segments/Forecasts'
import Insider from './Segments/Insider/Insider'
import Management from './Segments/Management/Management'
import SecFilings from './Segments/SecFilings/SecFilings'
import Segments from './Segments/Segments'
import Shareholders from './Segments/Shareholders/Shareholders'
import Shorts from './Segments/Shorts'
import Valuation from './Segments/Valuation/Valuation'

import NeedUpgrading from '../../NeedUpgrading';

export default function ({ segment }) {
  const dispatch = useDispatch()
  const { id } = useParams()
  const firstLetterUppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')).result);

  const stock = useSelector(state => state.oneStock)

  useEffect(() => {
    dispatch(getOneStock(id))
  }, [dispatch])

  let element

  switch (segment) {
    case 'overview':
      element = <Overview stock={stock} />;
      break;
    case 'statements':
      element = <Statements stock={stock} />;
      break;
    case 'valuation':
      element = <Valuation stock={stock} />;
      break;
    case 'competition':
      if (user.tier != 'Free Plan' && user.tier != 'Pro Plan') {
        element = <Competition stock={stock} />;
      } else {
        element = <NeedUpgrading segment={segment} plan={'Premium'} />
      }
      break;
    case 'forecasts':
      if (user.tier != 'Free Plan') {
        element = <Forecasts stock={stock} />;
      } else {
        element = <NeedUpgrading segment={segment} plan={'Pro'} />
      }
      break;
    case 'segments':
      if (user.tier != 'Free Plan' && user.tier != 'Pro Plan') {
        element = <Segments stock={stock} />;
      } else {
        element = <NeedUpgrading segment={segment} plan={'Premium'} />
      }
      break;
    case 'insider':
      if (user.tier != 'Free Plan' && user.tier != 'Pro Plan') {
        element = <Insider stock={stock} />;
      } else {
        element = <NeedUpgrading segment={segment} plan={'Premium'} />
      }
      break;
    case 'dividends':
      element = <Dividends stock={stock} />;
      break;
    case 'shorts':
      if (user.tier != 'Free Plan' && user.tier != 'Pro Plan') {
        element = <Shorts stock={stock} />;
      } else {
        element = <NeedUpgrading segment={segment} plan={'Premium'} />
      };
      break;
    case 'buybacks':
      if (user.tier != 'Free Plan') {
        element = <Buybacks stock={stock} />;
      } else {
        element = <NeedUpgrading segment={segment} plan={'Pro'} />
      }
      break;
    case 'management':
      if (user.tier == 'Ultimate Plan' || user.tier == 'Admin Plan') {
        element = <Management stock={stock} />;
      } else {
        element = <NeedUpgrading segment={segment} plan={'Ultimate'} />
      }
      break;
    case 'shareholders':
      if (user.tier == 'Ultimate Plan' || user.tier == 'Admin Plan') {
        element = <Shareholders stock={stock} />;
      } else {
        element = <NeedUpgrading segment={segment} plan={'Ultimate'} />
      }
      break;
    case 'sec-filings':
      if (user.tier != 'Free Plan') {
        element = <SecFilings stock={stock} />;
      } else {
        element = <NeedUpgrading segment={'SEC filings'} plan={'Pro'} />
      }
      break;
    case 'export':
      if (user.tier != 'Free Plan') {
        element = <Export stock={stock} />;
      } else {
        element = <NeedUpgrading segment={'export data'} plan={'Pro'} />
      }
      break;

    default:
      element = <div></div>;
  }

  if (typeof stock === 'object' && Object.keys(stock).length !== 0) {
    return (
      <div style={{
        width: 'calc(100vw - 209.09px)',
        height: 'calc(100vh - 60px)',
        display: 'inline-block',
        float: 'right',
        zIndex: '-1',
        overflow: 'hidden'
      }}>
        {element}
      </div>
    )
  } else {
    return (
      <div style={{
        width: 'calc(100vw - 209.09px)',
        height: 'calc(100vh - 60px)',
        display: 'inline-block',
        float: 'right',
        zIndex: '-1',
        overflow: 'hidden'
      }}>
        Loading
      </div>
    )
  }

}
