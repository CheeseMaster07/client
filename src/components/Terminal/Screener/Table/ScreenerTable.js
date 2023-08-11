import React from 'react'


import ColumnHeader from './ColumnHeader'
import ScreenerTableRow from './ScreenerTableRow'

export default function ScreenerTable({
  metrics,
  stocks,
  filter,
  setFilter,
  sortBy,
  setSortBy
}) {
  //console.log(stocks)

  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  }

  const x = {}
  metrics.filter(metric => metric.id).forEach(metric => x[metric.id] = metric)


  if (arraysEqual(Object.keys(x), Object.keys(filter))) {
    return (
      <div className="screenerTable-container">
        <table className="screenerTable">
          <colgroup>
            {metrics.map((metric, index) => {
              if (index === 0) {
                return <col key={index} style={{ width: `209px` }} />
              }
              return <col key={index} style={{ width: `150px` }} />
            }
            )}
          </colgroup>
          <thead>
            <tr>
              {metrics.map(metric => {
                return <ColumnHeader metric={metric} filter={filter} setFilter={setFilter} sortBy={sortBy} setSortBy={setSortBy} />
              })}
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => {
              return <ScreenerTableRow metrics={metrics} stock={stock} index={index} />
            })}

          </tbody>
        </table>
      </div>
    )
  }

}
