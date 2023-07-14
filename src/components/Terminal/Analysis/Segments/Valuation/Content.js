import React from 'react'

import Dcf from './Dcf'
import Multiples from './Multiples'

export default function Content({ mode, periods, reports, stock }) {
  return (
    <div>
      {mode == 'multiples' ?
        <Multiples
          stock={stock}
          periods={periods}
          reports={reports}
        />
        :
        <Dcf />

      }
    </div>
  )
}
