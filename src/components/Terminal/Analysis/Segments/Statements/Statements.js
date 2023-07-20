import React, { useEffect, useState, useRef } from 'react'

import '../../../../../css/terminal/segments/statements.css'

import Button from '../../../Button'
import Table from './Table'
import Chart from './StatementsChart'

export default function Statements({ stock }) {

  const [financialStatement, setFinancialStatement] = useState('incomeStatement')
  const [timeframe, setTimeframe] = useState('yearly')
  const [periods, setperiods] = useState('10')
  const [metrics, setMetrics] = useState([])

  useEffect(() => {
    let metricsData = [];

    switch (financialStatement) {
      case 'incomeStatement':
        metricsData = [
          { id: 'totalRevenue', label: 'Total Revenue', type: 'main', collapsible: false, color: 'rgb(68, 138, 255)' },

          { id: 'costOfRevenue', label: 'Cost of Goods Sold', type: 'second', collapsible: true, color: 'rgb(231, 12, 12)' },
          { id: 'depreciationAndAmortization', label: 'D&A', type: 'costOfRevenue-sub', collapsible: false, color: 'rgb(231, 12, 12)' },
          { id: 'otherCostOfRevenue', label: 'Other Cost of Goods Sold', type: 'costOfRevenue-sub', collapsible: false, color: 'rgb(231, 12, 12)' },

          { id: 'grossProfit', label: 'Gross Profit', type: 'main', collapsible: false, color: 'rgb(77, 208, 225)' },

          { id: 'totalOperatingExpenses', label: 'Operating Expenses', type: 'second', collapsible: true, color: 'rgb(231, 12, 12)' },
          { id: 'sellingGeneralAdministrative', label: 'SG&A Expenses', type: 'totalOperatingExpenses-sub', collapsible: false, color: 'rgb(231, 12, 12)' },
          { id: 'researchDevelopment', label: 'Research and Development', type: 'totalOperatingExpenses-sub', collapsible: false, color: 'rgb(231, 12, 12)' },

          { id: 'operatingIncome', label: 'Operating Income', type: 'main', collapsible: false, color: 'rgb(179, 136, 255)' },

          { id: 'nonOperatingIncomeNetOther', label: 'Non Operating Income', type: 'second', collapsible: true, color: 'rgb(231, 12, 12)' },

          { id: 'incomeBeforeTax', label: 'Pretax Income', type: 'main', collapsible: false, color: 'rgb(245, 127, 23)' },

          { id: 'incomeTaxExpense', label: 'Taxes', type: 'second', collapsible: false, color: 'rgb(231, 12, 12)' },

          { id: 'netIncome', label: 'Net Income', type: 'main', collapsible: false, color: 'rgb(251, 192, 45)' },
          // Add more metrics as needed
        ];
        break;

      case 'balanceSheet':
        metricsData = [
          { id: 'totalAssets', label: 'Total Assets', type: 'main', collapsible: true, color: 'rgb(68, 138, 255)' },
          { id: 'totalCurrentAssets', label: 'Current Assets', type: 'totalAssets-sub', collapsible: false },
          { id: 'nonCurrentAssetsTotal', label: 'Non-current Assets', type: 'totalAssets-sub', collapsible: false },

          { id: 'totalLiab', label: 'Total Liabilities', type: 'main', collapsible: true, color: 'rgb(77, 208, 225)' },
          { id: 'totalCurrentLiabilities', label: 'Current Liabilities', type: 'totalLiab-sub', collapsible: false },
          { id: 'nonCurrentLiabilitiesTotal', label: 'Non-current Liabilities', type: 'totalLiab-sub', collapsible: false },

          { id: 'totalStockholderEquity', label: 'Total Equity', type: 'main', collapsible: true, color: 'rgb(245, 127, 23)' },
          { id: '', label: "Shareholders' equiy", type: 'totalStockholderEquity-sub', collapsible: false },
          { id: '', label: 'Minority Interest', type: 'totalStockholderEquity-sub', collapsible: false },
          // Add more metrics as needed
        ];
        break;

      case 'cashflowStatement':
        metricsData = [
          { id: 'totalCashFromOperatingActivities', label: 'Operating Cashflow', type: 'main', collapsible: true, color: 'rgb(68, 138, 255)' },
          { id: 'totalCashflowsFromInvestingActivities', label: 'Investing Cashflow', type: 'main', collapsible: true, color: 'rgb(77, 208, 225)' },
          { id: 'totalCashFromFinancingActivities', label: 'Financing Cashflow', type: 'main', collapsible: true, color: 'rgb(245, 127, 23)' },
          { id: 'freeCashFlow', label: 'Free Cash Flow', type: 'main', collapsible: false, color: 'rgb(179, 136, 255)' },
          // Add more metrics as needed
        ];
        break;

      case 'statistics':
        metricsData = [
          { id: 'sharesOutstanding', label: 'Shares Outstanding', type: 'main', collapsible: false, color: 'rgb(68, 138, 255)' },
          { id: 'grossMargin', label: 'Gross Margin', type: 'main', collapsible: false, color: 'rgb(68, 138, 255)', extraInfo: 'precentage' },
          { id: 'operatingMargin', label: 'Operating Margin', type: 'main', collapsible: false, color: 'rgb(68, 138, 255)', extraInfo: 'precentage' },
          { id: 'netMargin', label: 'Net Margin', type: 'main', collapsible: false, color: 'rgb(68, 138, 255)', extraInfo: 'precentage' },
          { id: 'returnOnAssets', label: 'Return on Assets', type: 'main', collapsible: false, color: 'rgb(68, 138, 255)', extraInfo: 'precentage' },
          { id: 'returnOnEquity', label: 'Return on Equity', type: 'main', collapsible: false, color: 'rgb(68, 138, 255)', extraInfo: 'precentage' },
          { id: 'currentRatio', label: 'Current Ratio', type: 'main', collapsible: false, color: 'rgb(68, 138, 255)', extraInfo: 'whole' },
          { id: 'quickRatio', label: 'Quick Ratio', type: 'main', collapsible: false, color: 'rgb(68, 138, 255)', extraInfo: 'whole' },
        ];
        break;

      default:
        break;
    }

    setMetrics(metricsData);
  }, [financialStatement, timeframe]);

  let reports
  let allReports

  let keys
  let lastFiveKeys

  switch (financialStatement) {
    case 'incomeStatement':
      allReports = stock.fundamentals.financialStatements.Income_Statement[`${timeframe}`]
      keys = Object.keys(allReports);
      lastFiveKeys = keys.slice(0, Number(periods));
      reports = {};

      for (const key of lastFiveKeys) {
        reports[key] = allReports[key];
      }


      break;

    case 'balanceSheet':
      allReports = stock.fundamentals.financialStatements.Balance_Sheet[`${timeframe}`]
      keys = Object.keys(allReports);
      lastFiveKeys = keys.slice(0, Number(periods));
      reports = {};


      for (const key of lastFiveKeys) {
        reports[key] = allReports[key];
      }


      break;

    case 'cashflowStatement':
      allReports = stock.fundamentals.financialStatements.Cash_Flow[`${timeframe}`]
      keys = Object.keys(allReports);
      lastFiveKeys = keys.slice(0, Number(periods));
      reports = {};

      for (const key of lastFiveKeys) {
        reports[key] = allReports[key];
      }


      break;

    case 'statistics':
      allReports = stock.fundamentals.financialStatements.Statistics[`${timeframe}`]
      keys = Object.keys(allReports);
      lastFiveKeys = keys.slice(0, Number(periods));
      reports = {};

      for (const key of lastFiveKeys) {
        reports[key] = allReports[key];
      }

      break;

    default:
      break;
  }

  return (
    <>
      <div className="statements-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0px', width: `${window.innerWidth < 2000 ? '320px' : '350px'}` }}>
          <img style={{ width: `20%`, backgroundColor: 'white', padding: `${window.innerWidth < 2000 ? '10px' : '20px'}`, borderRadius: '', height: `20%`, marginLeft: '30px' }} src={`https://eodhistoricaldata.com/${stock.general.LogoURL}`} />
          <h2 className='statements-ticker'>{stock.ticker}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="statements">
            <Button
              text={'Income Statement'}
              type={'statement'}
              name={'incomeStatement'}
              state={financialStatement}
              setState={() => setFinancialStatement('incomeStatement')}
            />

            <Button
              text={'Balance Sheet'}
              type={'statement'}
              name={'balanceSheet'}
              state={financialStatement}
              setState={() => setFinancialStatement('balanceSheet')} />

            <Button
              text={'Cashflow Statement'}
              type={'statement'}
              name={'cashflowStatement'}
              state={financialStatement}
              setState={() => setFinancialStatement('cashflowStatement')} />

            <Button
              text={'Statistics'}
              type={'statement'}
              name={'statistics'}
              state={financialStatement}
              setState={() => setFinancialStatement('statistics')} />

          </div>
          <div className="timeframes">
            <div className="yearly-quarterly">

              <Button
                text={'Yearly'}
                type={'yearly-quarterly'}
                name={'yearly'}
                state={timeframe}
                setState={() => setTimeframe('yearly')} />

              <Button
                text={'Quarterly'}
                type={'yearly-quarterly'}
                name={'quarterly'}
                state={timeframe}
                setState={() => setTimeframe('quarterly')} />

            </div>
            <div className="years">
              <Button
                text={
                  timeframe == 'yearly'
                    ?
                    '5 years'
                    :
                    '5 quarters'
                }
                type={'periods'}
                name={'5'}
                state={periods}
                setState={() => setperiods('5')}
                timeframe={timeframe}
                numOfReports={Object.keys(allReports).length} />

              <Button
                text={
                  timeframe == 'yearly'
                    ?
                    '10 years'
                    :
                    '10 quarters'
                }
                type={'periods'}
                name={'10'}
                state={periods}
                setState={() => setperiods('10')}
                timeframe={timeframe}
                numOfReports={Object.keys(allReports).length} />

              <Button
                text={
                  timeframe == 'yearly'
                    ?
                    '15 years'
                    :
                    '15 quarters'
                }
                type={'periods'}
                name={'15'}
                state={periods}
                setState={() => setperiods('15')}
                timeframe={timeframe}
                numOfReports={Object.keys(allReports).length} />

              <Button
                text={
                  timeframe == 'yearly'
                    ?
                    '20 years'
                    :
                    '20 quarters'
                }
                type={'periods'}
                name={'20'}
                state={periods}
                setState={() => setperiods('20')}
                timeframe={timeframe}
                numOfReports={Object.keys(allReports).length} />

              <Button
                text={
                  timeframe == 'yearly'
                    ?
                    '25 years'
                    :
                    '25 quarters'
                }
                type={'periods'}
                name={'25'}
                state={periods}
                setState={() => setperiods('25')}
                timeframe={timeframe}
                numOfReports={Object.keys(allReports).length} />
            </div>
          </div>
        </div>
        <Button text={'Export Data'} type={'export'} />
      </div>
      <Table data={reports} metrics={metrics} timeframe={timeframe} IS={stock.fundamentals.financialStatements.Income_Statement[`${timeframe}`]} />
      <Chart data={reports} metrics={metrics} state={{
        financialStatement: financialStatement,
        timeframe: timeframe,
        periods: periods,
      }} />
    </>
  )
}

