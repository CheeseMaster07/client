import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Description({ stock }) {
  const descriptionArray = stock.general.Description.split('.')
  let description = stock.general.Description

  let sizes
  if (window.innerWidth < 2000) {
    sizes = {
      titleSize: '30px',
      titleMargin: '12px',
      width: '850px',
      height: '200px',
      descLength: 625,
      textSize: '18px',
    }
  } else {
    sizes = {
      titleSize: '34px',
      titleMargin: '16px',
      width: '1300px',
      height: '250px',
      descLength: 1100,
      textSize: '20px',
    }
  }

  while (description.length > sizes.descLength) {
    descriptionArray.pop()
    description = descriptionArray.join('\n')
    console.log(description.length)
  }
  description = description + '.'

  return (
    <div style={{ width: sizes.width, height: sizes.height, textAlign: 'center' }}>
      <h3 style={{ textAlign: 'center', fontSize: sizes.titleSize, margin: '0', marginBottom: sizes.titleMargin }}>Description</h3>
      <div style={{ backgroundColor: 'var(--green-middark)', width: '100%', height: '88%', display: 'inline-block', borderRadius: '10px' }}>
        <p style={{ fontWeight: '500', textAlign: 'justify', marginLeft: '20px', marginRight: '20px', fontSize: sizes.textSize, marginTop: '12px' }}>{description}</p>

      </div>
    </div>
  )
}
