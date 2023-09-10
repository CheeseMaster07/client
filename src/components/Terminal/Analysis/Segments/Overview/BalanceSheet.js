import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function BalanceSheet({ stock }) {
  const navigate = useNavigate()
  const balanceSheet = Object.values(stock.fundamentals.financialStatements.Balance_Sheet.quarterly)[0]

  const totalAssets = Number(balanceSheet.totalAssets)
  const currnetAssets = Number(balanceSheet.totalCurrentAssets)
  const fixedAssets = Number(balanceSheet.nonCurrentAssetsTotal)

  const equityAndLiabilities = Number(balanceSheet.liabilitiesAndStockholdersEquity)

  const totalLiabilities = Number(balanceSheet.totalLiab)
  const currnetLiabilities = Number(balanceSheet.totalCurrentLiabilities)
  const fixedLiabilities = Number(balanceSheet.nonCurrentLiabilitiesTotal)

  const totalEquity = Number(balanceSheet.totalStockholderEquity)

  console.log(totalAssets)
  console.log(equityAndLiabilities)

  let sizes
  if (window.innerWidth < 2000) {
    sizes = {
      titleSize: '30px',
      titleMargin: '12px',
      width: '450px',
      height: '420px',
    }
  } else {
    sizes = {
      titleSize: '34px',
      titleMargin: '16px',
      width: '520px',
      height: '500px',
    }
  }

  return (
    <div style={{ width: sizes.width, height: sizes.height, textAlign: 'center' }} >
      <h3 style={{ textAlign: 'center', fontSize: sizes.titleSize, margin: '0', marginBottom: sizes.titleMargin }}>Balance Sheet</h3>
      <div style={{ backgroundColor: 'var(--green-middark)', width: '82%', height: '88%', display: 'inline-block', borderRadius: '10px', cursor: 'pointer' }} onClick={() => navigate(`/terminal/analysis/${stock.ticker}/statements`)}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{
            height: '100%',
            width: '50%',
            backgroundColor: 'rgba(68, 138, 255, .1)',
            borderRight: 'solid 1px rgba(68, 138, 255, 1)',
            borderTop: 'solid 2px rgba(68, 138, 255, 1)',
            borderBottom: 'solid 2px rgba(68, 138, 255, 1)',
            borderLeft: 'solid 2px rgba(68, 138, 255, 1)',
            overflow: 'hidden',
            borderRadius: '10px 0 0 10px'
          }}>
            <div style={{ height: `${(currnetAssets / totalAssets * 100).toFixed(0)}%`, width: '100%', borderBottom: 'solid 2px rgba(68, 138, 255, 1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ margin: '0', fontWeight: 'bold', fontSize: '19px' }}>Current Assets</p>
            </div>
            <div style={{ height: `${(fixedAssets / totalAssets * 100).toFixed(0)}%`, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ margin: '0', fontWeight: 'bold', fontSize: '19px' }}>Fixed Assets</p>

            </div>
          </div>
          <div style={{ width: '50%' }}>
            <div style={{
              height: `${(totalLiabilities / equityAndLiabilities * 100).toFixed(0)}%`,
              width: '100%',
              backgroundColor: 'rgba(77, 208, 225, .1)',
              borderLeft: 'solid 1px rgba(77, 208, 225, 1)',
              borderBottom: 'solid 1px rgba(77, 208, 225, 1)',
              borderRight: 'solid 2px rgba(77, 208, 225, 1)',
              borderTop: 'solid 2px rgba(77, 208, 225, 1)',
              overflow: 'hidden',
              borderRadius: '0 10px 0 0',
            }}>
              <div style={{ height: `${(currnetLiabilities / totalLiabilities * 100).toFixed(0)}%`, width: '100%', borderBottom: 'solid 2px rgba(77, 208, 225, 1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ margin: '0', fontWeight: 'bold', fontSize: '19px' }}>Current Liabilities</p>
              </div>
              <div style={{ height: `${(fixedLiabilities / totalLiabilities * 100).toFixed(0)}%`, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ margin: '0', fontWeight: 'bold', fontSize: '19px' }}>Fixed Liabilities</p>

              </div>
            </div>
            <div style={{
              height: `calc(${(totalEquity / equityAndLiabilities * 100).toFixed(0)}% - 2px)`,
              width: '100%',
              backgroundColor: 'rgba(251, 192, 45, .1)',
              borderTop: 'solid 1px rgba(251, 192, 45, 1)',
              borderLeft: 'solid 1px rgba(251, 192, 45, 1)',
              borderBottom: 'solid 2px rgba(251, 192, 45, 1)',
              borderRight: 'solid 2px rgba(251, 192, 45, 1)',
              overflow: 'hidden',
              borderRadius: '0 0 10px 0',
            }}>
              <div style={{ height: `100%`, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ margin: '0', fontWeight: 'bold', fontSize: '19px' }}>Equity</p>

              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
