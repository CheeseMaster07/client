import React, { useState } from 'react'

import Stocks from '../../Terminal/Stocks/Stocks'

import '../../../css/homepage/searchBar.css'


export default function SearchBar() {

  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <>
      <input onChange={handleChange} className='searchBar' type='text' placeholder='Search...' />
      <Stocks searchQuery={searchQuery.toUpperCase()} type={'homepage'} />
    </>

  )
}
