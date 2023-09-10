import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function KeyFacts({ stock }) {
  const navigate = useNavigate()
  function formatLargeNum(num, decimals) {
    if (Math.abs(num) >= 1000000000000) {
      return (num / 1000000000000).toFixed(decimals) + 'T'
    } else if (Math.abs(num) >= 1000000000) {
      return (num / 1000000000).toFixed(decimals) + 'B';
    } else if (Math.abs(num) >= 1000000) {
      return (num / 1000000).toFixed(decimals) + 'M';
    } else if (Math.abs(num) >= 1000) {
      return (num / 1000).toFixed(decimals) + 'K';
    } else {
      try {
        return num.toFixed(2);
      } catch (error) {
        return num
      }
    }
  }

  const keyFacts = [
    {
      label: 'Market Cap',
      data: formatLargeNum(stock.fundamentals.highlights.MarketCapitalization, 1),

      label2: 'Revenue CAGR',
      data2: `${stock.screenerData.growth.revenueGrowth['5 Years'].CAGR.toFixed(2)}%`,
    },
    {
      label: 'Profit Margin',
      data: `${(stock.fundamentals.dcf.profitMargin.oneYear * 100).toFixed(2)}%`,

      label2: 'ROIC',
      data2: '0',
    },
    {
      label: 'PE (TTM)',
      data: stock.fundamentals.valuation.TrailingPE.toFixed(1),

      label2: 'PE (FWD)',
      data2: stock.fundamentals.valuation.ForwardPE.toFixed(1),
    },
    {
      label: 'CEO',
      data: stock.general.Officers['0'].Name.replace(/^Mr\. /, ''),

      label2: 'Sector',
      data2: stock.general.Sector,
    },
    {
      label: 'IPO',
      data: stock.general.IPODate.split('-')[0],

      label2: 'Employees',
      data2: formatLargeNum(stock.general.FullTimeEmployees, 0),
    },
  ]

  let sizes
  if (window.innerWidth < 2000) {
    sizes = {
      titleSize: '30px',
      titleMargin: '12px',
      textSize: '20px',
      textMarginTop: '17px',
      width: '450px',
      height: '420px',
      gap: '5px',
      textBoxWidth: '160px',
    }
  } else {
    sizes = {
      titleSize: '34px',
      titleMargin: '16px',
      textSize: '22px',
      textMarginTop: '25px',
      width: '520px',
      height: '500px',
      gap: '40px',
      textBoxWidth: '180px',

    }
  }
  return (
    <div style={{ width: sizes.width, height: sizes.height, textAlign: 'center' }}>
      <h3 style={{ textAlign: 'center', fontSize: sizes.titleSize, margin: '0', marginBottom: sizes.titleMargin }}>Key Facts</h3>
      <div style={{ backgroundColor: 'var(--green-middark)', width: '82%', height: '88%', display: 'inline-block', borderRadius: '10px' }}>
        {keyFacts.map(row => {
          return <div style={{ display: 'flex', justifyContent: 'center', gap: sizes.gap, marginTop: sizes.textMarginTop }}>
            <div style={{ width: sizes.textBoxWidth, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <p style={{ fontSize: sizes.textSize, fontWeight: 'bold', margin: '0' }}>{row.label}</p>
              <p style={{ fontSize: sizes.textSize, fontWeight: 'bold', margin: '0', marginTop: '5px', color: '#EEFF84' }}>{row.data}</p>
            </div>
            <div style={{ width: sizes.textBoxWidth, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <p style={{ fontSize: sizes.textSize, fontWeight: 'bold', margin: '0' }}>{row.label2}</p>
              <p style={{ fontSize: sizes.textSize, fontWeight: 'bold', margin: '0', marginTop: '5px', color: '#EEFF84' }}>{row.data2}</p>
            </div>
          </div>
        })}



      </div>
    </div>
  )
}
