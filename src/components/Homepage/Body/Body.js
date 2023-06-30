import React from 'react'

import '../../../css/body.css'

import SearchBar from './SearchBar'
import Terminal from './Segments/Terminal'
import Api from './Segments/Api'

export default function Body() {
  return (
    <div className='body-container'>
      < SearchBar />
      < Terminal />
      < Api />
    </div>
  )
}
