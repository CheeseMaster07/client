import React from 'react'

import '../../../css/homepage/body.css'

import SearchBar from './SearchBar'
import Terminal from './Segments/Terminal'
import Api from './Segments/Api'
import Pricing from './Segments/Pricing'

export default function Body() {
  return (
    <div className='body-container'>
      < SearchBar />
      < Terminal />
      < Api />
      < Pricing />
    </div>
  )
}
