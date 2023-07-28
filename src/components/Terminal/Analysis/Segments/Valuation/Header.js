import React from 'react'

import Button from '../../../Button'

export default function Header({
  reports,
  allReports,
  mode,
  setMode,
  periods,
  setperiods,
  metrics,
  setMetrics,

}) {
  return (
    <div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="modes">
          <Button
            text={'Multiples'}
            type={'mode'}
            name={'multiples'}
            state={mode}
            setState={() => setMode('multiples')}
          />

          <Button
            text={'DCF'}
            type={'mode'}
            name={'dcf'}
            state={mode}
            setState={() => setMode('dcf')} />

        </div>
        {mode == 'multiples' ?
          <div className="years">

            <Button
              text={'1 year'}
              type={'periods'}
              name={'1'}
              state={periods}
              setState={() => setperiods('1')}
              numOfReports={Object.keys(allReports).length} />

            <Button
              text={'3 years'}
              type={'periods'}
              name={'3'}
              state={periods}
              setState={() => setperiods('3')}
              numOfReports={Object.keys(allReports).length} />

            <Button
              text={'5 years'}
              type={'periods'}
              name={'5'}
              state={periods}
              setState={() => setperiods('5')}
              numOfReports={Object.keys(allReports).length} />

            <Button
              text={'10 years'}
              type={'periods'}
              name={'10'}
              state={periods}
              setState={() => setperiods('10')}
              numOfReports={Object.keys(allReports).length} />

            <Button
              text={'25 years'}
              type={'periods'}
              name={'25'}
              state={periods}
              setState={() => setperiods('25')}
              numOfReports={Object.keys(allReports).length} />
          </div>
          :
          <div className="years">

            <Button
              text={'5 years'}
              type={'periods'}
              name={'5'}
              state={periods}
              setState={() => setperiods('5')}
              numOfReports={Object.keys(allReports).length}
              segment={mode} />

            <Button
              text={'10 years'}
              type={'periods'}
              name={'10'}
              state={periods}
              setState={() => setperiods('10')}
              numOfReports={Object.keys(allReports).length}
              segment={mode} />

            <Button
              text={'20 years'}
              type={'periods'}
              name={'20'}
              state={periods}
              setState={() => setperiods('20')}
              numOfReports={Object.keys(allReports).length}
              segment={mode} />

            <Button
              text={'30 years'}
              type={'periods'}
              name={'30'}
              state={periods}
              setState={() => setperiods('30')}
              numOfReports={Object.keys(allReports).length}
              segment={mode} />
          </div>
        }

      </div>
    </div>
  )
}
