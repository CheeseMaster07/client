import React from 'react'


export default function Overview({ stock }) {
  console.log(stock)
  return (
    <div>Overview {stock.ticker} {stock.general.Name}</div>
  )
}
