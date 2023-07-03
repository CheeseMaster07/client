import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { getOneStock } from '../../../actions/stocks';

import Overview from './Segments/Overview'
import Statements from './Segments/Statements/Statements'
import Buybacks from './Segments/Buybacks'
import Competition from './Segments/Competition'
import Dividends from './Segments/Dividends'
import Export from './Segments/Export'
import Forecasts from './Segments/Forecasts'
import Insider from './Segments/Insider'
import Management from './Segments/Management'
import SecFilings from './Segments/SecFilings'
import Segments from './Segments/Segments'
import Shareholders from './Segments/Shareholders'
import Shorts from './Segments/Shorts'
import Valuation from './Segments/Valuation'

export default function ({ segment }) {
  const dispatch = useDispatch()
  const { id } = useParams()

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
      element = <Competition stock={stock} />;
      break;
    case 'forecasts':
      element = <Forecasts stock={stock} />;
      break;
    case 'segments':
      element = <Segments stock={stock} />;
      break;
    case 'insider':
      element = <Insider stock={stock} />;
      break;
    case 'dividends':
      element = <Dividends stock={stock} />;
      break;
    case 'shorts':
      element = <Shorts stock={stock} />;
      break;
    case 'buybacks':
      element = <Buybacks stock={stock} />;
      break;
    case 'management':
      element = <Management stock={stock} />;
      break;
    case 'shareholders':
      element = <Shareholders stock={stock} />;
      break;
    case 'sec-filings':
      element = <SecFilings stock={stock} />;
      break;
    case 'export':
      element = <Export stock={stock} />;
      break;

      break;
    default:
      element = <div></div>;
  }
  console.log(stock)
  if (typeof stock === 'object' && Object.keys(stock).length !== 0) {
    return (
      <div style={{
        width: 'calc(100vw - 209.09px)',
        height: 'calc(100vh - 60px)',
        display: 'inline-block',
        float: 'right',
      }}>
        {element}
      </div>
    )
  }

}
