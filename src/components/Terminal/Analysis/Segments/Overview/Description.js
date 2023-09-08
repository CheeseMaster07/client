import React from 'react'

export default function Description({ stock }) {
  const descriptionArray = stock.general.Description.split('.')
  let description = stock.general.Description

  while (description.length > 1100) {
    descriptionArray.pop()
    description = descriptionArray.join('\n')
    console.log(description.length)
  }
  description = description + '.'


  return (
    <div style={{ width: '1300px', height: '250px', textAlign: 'center' }}>
      <h3 style={{ textAlign: 'center', fontSize: '34px', margin: '0', marginBottom: '16px' }}>Description</h3>
      <div style={{ backgroundColor: 'var(--green-middark)', width: '100%', height: '88%', display: 'inline-block', borderRadius: '10px' }}>
        <p style={{ fontWeight: '500', textAlign: 'justify', marginLeft: '20px', marginRight: '20px', fontSize: '20px', marginTop: '12px' }}>{description}</p>

      </div>
    </div>
  )
}
