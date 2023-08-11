import React from 'react'

import Button from '../../Button'

export default function CategoriesButtons({ category, setCategory }) {
  return (
    <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
      <div style={{ display: 'flex', width: '80%', justifyContent: 'space-between' }}>
        <Button
          text={'General'}
          type={'category'}
          name={'general'}
          state={category}
          setState={() => setCategory('general')}
        />
        <Button
          text={'Valuation'}
          type={'category'}
          name={'valuation'}
          state={category}
          setState={() => setCategory('valuation')}
        />
        <Button
          text={'Growth'}
          type={'category'}
          name={'growth'}
          state={category}
          setState={() => setCategory('growth')}
        />
        <Button
          text={'Dividends'}
          type={'category'}
          name={'dividends'}
          state={category}
          setState={() => setCategory('dividends')}
        />
      </div>
      <div style={{ display: 'flex', width: '80%', justifyContent: 'space-between' }}>
        <Button
          text={'Buybacks'}
          type={'category'}
          name={'buybacks'}
          state={category}
          setState={() => setCategory('buybacks')}
        />
        <Button
          text={'Stability'}
          type={'category'}
          name={'stability'}
          state={category}
          setState={() => setCategory('stability')}
        />
        <Button
          text={'Profitability'}
          type={'category'}
          name={'profitability'}
          state={category}
          setState={() => setCategory('profitability')}
        />
        <Button
          text={'Share Price'}
          type={'category'}
          name={'sharePrice'}
          state={category}
          setState={() => setCategory('sharePrice')}
        />
      </div>


    </div>
  )
}