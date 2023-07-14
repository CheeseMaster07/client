import React from 'react'

export default function ExtrasMenu({ metric, extras, setExtras }) {

  const metricsHasPrecentOfRevenue = [
    'costOfRevenue',
    'depreciationAndAmortization',
    'otherCostOfRevenue',
    'grossProfit',
    'totalOperatingExpenses',
    'sellingGeneralAdministrative',
    'researchDevelopment',
    'operatingIncome',
    'nonOperatingIncomeNetOther',
    'incomeBeforeTax',
    'incomeTaxExpense',
    'netIncome',
    'totalCashFromOperatingActivities',
    'totalCashflowsFromInvestingActivities',
    'totalCashFromFinancingActivities',
    'freeCashFlow',
  ]
  return (
    <div className="extras-menu">
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
        <label class='checkbox' for={`toggle-${metric.id}-YoY`}>
          <input type='checkbox' checked={extras[metric.id].YoY ? true : false} class='checkbox__input' id={`toggle-${metric.id}-YoY`} />
          <div onClick={() => {
            setExtras(() => ({
              ...extras, // Copy the previous state object
              [metric.id]: { YoY: !extras[metric.id].YoY, margin: extras[metric.id].margin }, // Modify the desired item in the copy
            }));
          }} class='checkbox__box' ></div>
        </label>
        <p style={{ margin: '0' }}>% Year over Year</p>
      </div>
      {metricsHasPrecentOfRevenue.includes(metric.id) ?
        <div style={{ width: '100%', height: '100%' }}>
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
            <label class='checkbox' for={`toggle-${metric.id}-margin`}>
              <input type='checkbox' checked={extras[metric.id].margin ? true : false} class='checkbox__input' id={`toggle-${metric.id}-margin`} />
              <div onClick={() => {
                setExtras(() => ({
                  ...extras, // Copy the previous state object
                  [metric.id]: { YoY: extras[metric.id].YoY, margin: !extras[metric.id].margin }, // Modify the desired item in the copy
                }));
              }} class='checkbox__box' ></div>
            </label>
            <p style={{ margin: '0' }}>
              {metric.id != 'incomeTaxExpense' ?
                '% of Revenue'
                :
                '% of EBIT'
              }

            </p>
          </div>
        </div>
        :
        ''}

    </div >
  )
}
