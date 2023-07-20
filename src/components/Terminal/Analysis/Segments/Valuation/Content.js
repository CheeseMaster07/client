import React from 'react'

import Dcf from './Dcf'
import Multiples from './Multiples'

export default function Content({ metrics, mode, periods, reports, stock }) {
  return (
    <div>
      {mode == 'multiples' ?
        <Multiples
          metrics={metrics}
          stock={stock}
          periods={periods}
          reports={reports}
        />
        :
        <Dcf stock={stock}
          periods={periods}
        />

      }
    </div>
  )
}
