import React, { useEffect, useRef } from 'react'

import '../../../../../css/terminal/segments/statements.css'

export default function Statements({ stock }) {


  return (
    <div>
      <div className="statements-header">
        <h2>{stock.ticker}</h2>
      </div>
    </div>
  )
}



// <img src={`https://eodhistoricaldata.com/${stock.general.LogoURL}`} />
