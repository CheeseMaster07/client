import { categories } from './Categories'
console.log(categories)
// ADD TYPE: PRECENY; LARGE NUMBER ETC

function chooseMetric(segment, id, desc1, desc2) {
  if (!desc2) {
    const result = categories[segment][id].filter(metric => metric.desc === desc1)[0]
    return result;
  } else {
    return categories[segment][id].filter(metric => metric.desc === `${desc1} | ${desc2}`)[0];
  }
}


export const presets = {
  valuation: [
    chooseMetric('valuation', 'marketCap', 'Latest'),
    chooseMetric('growth', 'revenueGrowth', '5 Years', 'CAGR'),
    chooseMetric('valuation', 'priceSales', 'Trailing'),
    chooseMetric('valuation', 'priceEarnings', 'Trailing'),
    chooseMetric('valuation', 'priceEarnings', 'Forward'),
    chooseMetric('valuation', 'priceBook', 'Trailing'),


  ],
  growth: [
    chooseMetric('valuation', 'marketCap', 'Latest'),
    chooseMetric('sharePrice', 'sharePrice', '5 Years', 'CAGR'),
    chooseMetric('growth', 'revenueGrowth', '5 Years', 'CAGR'),
    chooseMetric('growth', 'revenueGrowth', '5 Years', 'Cumulative'),
    chooseMetric('growth', 'EPSGrowth', '3 Years', 'CAGR'),
    {
      label: 'Profitable',
      desc: '# of Years | Profit',
      id: 'profitable',
      segment: 'profitability',
      type: 'smallNum',
      link: 'statements',

    },

  ],
  momentum: [
    chooseMetric('sharePrice', 'sharePrice', '1 day'),
    chooseMetric('sharePrice', 'sharePrice', '1 week'),
    chooseMetric('sharePrice', 'sharePrice', '1 month'),
    chooseMetric('sharePrice', 'sharePrice', 'YTD'),
    chooseMetric('sharePrice', 'sharePrice', '5 Years', 'Cumulative'),

  ],
  dividends: [
    chooseMetric('sharePrice', 'sharePrice', 'Latest'),
    chooseMetric('dividends', 'dividendsPerShare', 'Latest'),
    chooseMetric('dividends', 'dividendsPerShare', '5 Years', 'CAGR'),
    chooseMetric('dividends', 'dividendsYield', 'Latest'),
    chooseMetric('dividends', 'dividendsYield', 'Average', '5 Years'),
    chooseMetric('dividends', 'payoutRatio', 'Latest'),

  ],
  buybacks: [
    chooseMetric('buybacks', 'sharesOutstanding', '5 Years', 'CAGR'),
    chooseMetric('buybacks', 'sharesOutstanding', '5 Years', 'Cumulative'),
  ],
  forecast: [

  ],
  financialStability: [
    chooseMetric('valuation', 'marketCap', 'Latest'),
    chooseMetric('stability', 'totalDebt', 'Latest'),
    chooseMetric('stability', 'cash', 'Latest'),
    chooseMetric('stability', 'netDebt', 'Latest'),
    chooseMetric('stability', 'currentRatio', '5 Years'),
    {
      label: 'Debt Payoff Time',
      desc: '# of Years | Profit',
      id: 'payoffTime',
      segment: 'stability',
      type: 'smallNum',

    },
  ],
}