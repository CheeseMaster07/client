import React from 'react'

export default function TableRow_For_Data({ period, height, fontSize, metrics, weight, align }) {
  const isMainStock = window.location.pathname.split('/')[3] == period.ticker

  const style = {
    padding: `${height}px 0`,
    fontSize: `${fontSize}px`,
    fontWeight: weight
  }

  if (isMainStock) {
    style.fontWeight = 'bold'
    style.padding = '12px 0px'
    style.fontSize = '33px'

  }


  return (
    <>
      <tr>
        {metrics.map(metric => {
          let backgroundColor = ''
          let color = ''
          if (isMainStock) {
            color = 'rgba(255, 255, 255, .6)'
          }
          let textAlign = align
          let paddingLeft = ''
          if (metric.id == 'rank') {
            textAlign = 'center'
          }
          if (textAlign == 'left') {
            paddingLeft = '15px'
          }

          switch (metric.id) {
            case 'transactionType':
              switch (period[metric.id]) {
                case 'Sale':
                  backgroundColor = 'rgba(255, 0, 0, .2)'
                  period.transactionAmount = 0 - period.transactionAmount

                  break;
                case 'Purchase':
                  backgroundColor = 'rgba(0, 255, 0, .2)'

                  break;

                default:
                  break;
              }
              break;


            default:
              break;
          }
          if (metric.link) {
            return <td style={{ ...style, fontWeight: '400' }} ><a style={{ color: 'rgba(255, 255, 255, .9)' }} href={period[metric.link]} target="_blank">{period[metric.link]}</a></td>
          }
          return <td style={{ ...style, backgroundColor: backgroundColor, color: color, textAlign: textAlign, paddingLeft: paddingLeft }}>{period[metric.id]}</td>
        })}

      </tr>
    </>

  )
}
