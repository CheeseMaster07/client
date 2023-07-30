import React, { useState } from 'react'

import '../../css/terminal/button.css'

export default function Button({ type, text, name, state, setState, timeframe, numOfReports, segment, isTurnedOf, }) {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };


  let styles = {
    padding: '',
    backgroundColor: ''
  }

  let turnedOf = false

  switch (type) {
    case 'statement':
      if (state == name) {
        styles.backgroundColor = 'var(--green-light)'

      }
      if (window.innerWidth < 2000) {
        styles.padding = '5px 50px'

      }
      break;
    case 'mode':
      if (state == name) {
        styles.backgroundColor = 'var(--green-light)'
      }

      break;
    case 'preset':
      styles.padding = '5px 35px'
      if (state == name) {
        styles.backgroundColor = 'var(--green-light)'
      }
      if (name == 'custom') {
        styles.marginRight = '80px'
      }

      break;
    case 'yearly-quarterly':
      styles.padding = '5px 25px'

      if (state == name) {
        styles.backgroundColor = 'var(--green-light)'
      }
      break;
    case 'periods':

      styles.padding = '5px 25px'
      if (timeframe == 'quarterly') {
        styles.padding = '5px 14.2px'

      }

      if (Number(name) > numOfReports + 3 && segment != 'dcf') {
        turnedOf = true
      }


      if (state == name) {
        styles.backgroundColor = 'var(--green-light)'
      }
      break;
    case 'export':
      styles = {
        marginLeft: '200px',
        padding: '5px 25px'
      }

      if (user.result.tier == 'Free Plan') {
        turnedOf = true
      }


      break;

    default:
      break;
  }

  return (
    <>
      <button onClick={turnedOf ? () => { } : setState} style={styles} className={turnedOf ? 'button-terminal-turned-of' : 'button-terminal'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {text}
        {isHover && type == 'export' && turnedOf ?
          <div className='need-upgrading-button'>You need <span style={{
            color: 'black',
            backgroundColor: `var(--tier-pro)`,
            padding: '0 8px',
            borderRadius: '2px',
            fontWeight: 'bold'
          }}>Pro</span> to export data</div>
          :
          ''
        }
      </button>

    </>

  )
}
