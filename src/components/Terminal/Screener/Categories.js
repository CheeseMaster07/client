const multiple_Array = ['10 Years', '5 Years', '3 Years', 'Trailing', 'Forward']
const growth_Array1 = ['10 Years', '5 Years', '3 Years', 'Trailing', 'Forward']
const growth_Array2 = ['CAGR', 'Cumulative']
const growth_Array_Full = []
const dividends_Array_Gain1 = ['Latest', '1 Year', '3 Years', '5 Years', '10 Years']
const dividends_Array_Gain2 = ['CAGR', 'Cumulative']
const dividends_Array_Gain_Full = []
const dividends_Array_Avg1 = ['Latest', 'Average']
const dividends_Array_Avg2 = ['3 Years', '5 Years', '10 Years']
const dividends_Array_Avg_Full = []
const average_Array = ['10 Years', '5 Years', '3 Years', 'Latest']
const average_TTM_Array = ['10 Years', '5 Years', '3 Years', 'TTM']
const sharePrice_Array1 = ['Latest', '1 day', '1 week', '1 month', 'YTD', '3 Years', '5 Years']
const sharePrice_Array2 = ['CAGR', 'Cumulative']
const sharePrice_Array_Full = []

growth_Array1.forEach((desc1) => {
  if (desc1.includes('Years')) {
    growth_Array2.forEach(desc2 => {
      growth_Array_Full.push(`${desc1} | ${desc2}`)

    })

  } else {
    growth_Array_Full.push(desc1)
  }

})

dividends_Array_Gain1.forEach((desc1) => {
  if (desc1.includes('Years')) {
    dividends_Array_Gain2.forEach(desc2 => {
      dividends_Array_Gain_Full.push(`${desc1} | ${desc2}`)

    })

  } else {
    dividends_Array_Gain_Full.push(desc1)
  }

})

dividends_Array_Avg1.forEach((desc1) => {
  if (desc1 == 'Average') {
    dividends_Array_Avg2.forEach(desc2 => {
      dividends_Array_Avg_Full.push(`${desc1} | ${desc2}`)

    })

  } else {
    dividends_Array_Avg_Full.push(desc1)
  }

})

sharePrice_Array1.forEach((desc1) => {
  if (desc1.includes('Years')) {
    sharePrice_Array2.forEach(desc2 => {
      sharePrice_Array_Full.push(`${desc1} | ${desc2}`)

    })

  } else {
    sharePrice_Array_Full.push(desc1)
  }

})


export const categories = {
  general: {
    sector: {
      sectors: [],
      toggled: false,
      sortBy: false,
    },
    industry: {
      industries: [],
      toggled: false,
      sortBy: false,
    },
  },
  valuation: {
    marketCap:
      [
        {
          label: 'Market Cap',
          desc: 'Latest',
          id: 'marketCap',
          segment: 'valuation',
          type: 'largeNum',
          link: 'valuation',
        }
      ],
    priceEarnings: multiple_Array.map(desc => {
      return {
        label: 'P/E',
        desc: desc,
        id: 'priceEarnings',
        segment: 'valuation',
        type: 'smallNum',
        link: 'valuation',
      }
    }),
    enterpriceValueEBIT: multiple_Array.filter(desc => desc != 'Forward').map(desc => {
      return {
        label: 'EV/EBIT',
        desc: desc,
        id: 'enterpriceValueEBIT',
        segment: 'valuation',
        type: 'smallNum',
        link: 'valuation',
      }
    }),
    priceBook: multiple_Array.filter(desc => desc != 'Forward').map(desc => {
      return {
        label: 'P/B',
        desc: desc,
        id: 'priceBook',
        segment: 'valuation',
        type: 'smallNum',
        link: 'valuation',
      }
    }),
    priceSales: multiple_Array.map(desc => {
      return {
        label: 'P/S',
        desc: desc,
        id: 'priceSales',
        segment: 'valuation',
        type: 'smallNum',
        link: 'valuation',
      }
    }),
    priceFreeCashflow: multiple_Array.filter(desc => desc != 'Forward').map(desc => {
      return {
        label: 'P/B',
        desc: desc,
        id: 'priceFreeCashflow',
        segment: 'valuation',
        type: 'smallNum',
        link: 'valuation',
      }
    }),
  },
  growth: {
    revenueGrowth: growth_Array_Full.map(desc => {
      return {
        label: 'Revenue Growth',
        desc: desc,
        id: 'revenueGrowth',
        segment: 'growth',
        type: 'precentage-gain',
        link: 'statements',
      }
    }),
    operatingIncomeGrowth: growth_Array_Full.filter(desc => desc != 'Forward').map(desc => {
      return {
        label: 'Operating Income Growth',
        desc: desc,
        id: 'operatingIncomeGrowth',
        segment: 'growth',
        type: 'precentage-gain',
        link: 'statements',
      }
    }),
    netIncomeGrowth: growth_Array_Full.filter(desc => desc != 'Forward').map(desc => {
      return {
        label: 'Net Income Growth',
        desc: desc,
        id: 'netIncomeGrowth',
        segment: 'growth',
        type: 'precentage-gain',
        link: 'statements',
      }
    }),
    EPSGrowth: growth_Array_Full.filter(desc => desc != 'Forward').map(desc => {
      return {
        label: 'EPS Growth',
        desc: desc,
        id: 'EPSGrowth',
        segment: 'growth',
        type: 'precentage-gain',
        link: 'statements',
      }
    }),
  },
  dividends: {
    dividendsPerShare: dividends_Array_Gain_Full.map(desc => {
      return {
        label: 'Dividends / Share',
        desc: desc,
        id: 'dividendsPerShare',
        segment: 'dividends',
        type: 'currency',
        link: 'dividends',

      }
    }),
    dividendsYield: dividends_Array_Avg_Full.map(desc => {
      return {
        label: 'Dividends Yield',
        desc: desc,
        id: 'dividendsYield',
        segment: 'dividends',
        type: 'precentage',
        link: 'dividends',

      }
    }),
    payoutRatio: dividends_Array_Avg_Full.map(desc => {
      return {
        label: 'Payout Ratio',
        desc: desc,
        id: 'payoutRatio',
        segment: 'dividends',
        type: 'precentage',
        link: 'dividends',

      }
    }),
  },
  buybacks: {
    sharesOutstanding: dividends_Array_Gain_Full.map(desc => {
      return {
        label: 'Shares Outstanding',
        desc: desc,
        id: 'sharesOutstanding',
        segment: 'buybacks',
        type: 'precentage-gain',
        link: 'buybacks',

      }
    })
  },
  forecast: {

  },
  stability: {
    totalDebt: dividends_Array_Gain_Full.map(desc => {
      return {
        label: 'Total Debt',
        desc: desc,
        id: 'totalDebt',
        segment: 'stability',
        type: 'largeNum',

      }
    }),
    cash: dividends_Array_Gain_Full.map(desc => {
      return {
        label: 'Cash',
        desc: desc,
        id: 'cash',
        segment: 'stability',
        type: 'largeNum',

      }
    }),
    netDebt: dividends_Array_Gain_Full.map(desc => {
      return {
        label: 'Net Debt',
        desc: desc,
        id: 'netDebt',
        segment: 'stability',
        type: 'largeNum',

      }
    }),
    currentRatio: average_Array.map(desc => {
      return {
        label: 'Current Ratio',
        desc: desc,
        id: 'currentRatio',
        segment: 'stability',
        type: 'smallNum',

      }
    }),
  },
  profitability: {
    returnOnAssets: average_TTM_Array.map(desc => {
      return {
        label: 'Return on Assets',
        desc: desc,
        id: 'returnOnAssets',
        segment: 'profitability',
        type: 'precentage',

      }
    }),
    returnOnEquity: average_TTM_Array.map(desc => {
      return {
        label: 'Return on Equity',
        desc: desc,
        id: 'returnOnEquity',
        segment: 'profitability',
        type: 'precentage',

      }
    }),
    grossMargin: average_TTM_Array.map(desc => {
      return {
        label: 'Gross Margin',
        desc: desc,
        id: 'grossMargin',
        segment: 'profitability',
        type: 'precentage',

      }
    }),
    operatingMargin: average_TTM_Array.map(desc => {
      return {
        label: 'Operating Margin',
        desc: desc,
        id: 'operatingMargin',
        segment: 'profitability',
        type: 'precentage',

      }
    }),
    profitMargin: average_TTM_Array.map(desc => {
      return {
        label: 'Profit Margin',
        desc: desc,
        id: 'profitMargin',
        segment: 'profitability',
        type: 'precentage',

      }
    }),
  },
  sharePrice: {

    sharePrice: sharePrice_Array_Full.map(desc => {
      return {
        label: 'Share Price',
        desc: desc,
        id: 'sharePrice',
        segment: 'sharePrice',
        type: 'precentage-gain',
        link: 'valuation',

      }
    }),
  },


}