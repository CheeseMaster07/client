export function TransformMetric(stock, metric) {
  function yearsTransformer(yrs) {
    return `${yrs.split(' ')[0]} Years`
  }

  function formatResult(num) {
    try {
      if (num == null) {
        return '---'
      }
      switch (metric.type) {
        case 'text':
          return num
          break
        case 'largeNum':
          if (Math.abs(num) >= 1000000000000) {
            return (num / 1000000000000).toFixed(1) + 'T'
          } else if (Math.abs(num) >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B';
          } else if (Math.abs(num) >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
          } else if (Math.abs(num) >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
          }
          break;
        case 'smallNum':
          return `${num.toFixed(1)}`

          break;
        case 'currency':
          return `$${num.toFixed(1)}`

          break;
        case 'precentage-gain':
          return `${num.toFixed(1)}%`

          break;
        case 'precentage':
          return `${(num * 100).toFixed(1)}%`

          break;

        default:
          break;
      }
    } catch (error) {
      return ''
    }

  }

  let result
  try {
    switch (metric.desc.split(' | ').length) {
      case 1:
        result = stock.screenerData[metric.segment][metric.id][metric.desc.split(' | ')[0]]
        break;
      case 2:
        let firstDescPart
        let secondDescPart = metric.desc.split(' | ')[1]
        if (metric.desc.split(' | ')[0].includes('Yrs')) {
          firstDescPart = yearsTransformer(metric.desc.split(' | ')[0])
        } else {
          firstDescPart = metric.desc.split(' | ')[0]
        }
        // console.log(stock.screenerData[metric.segment])
        // console.log(metric.id)
        // console.log(stock.screenerData[metric.segment][metric.id][firstDescPart][secondDescPart])
        result = stock.screenerData[metric.segment][metric.id][firstDescPart][secondDescPart]

        break

      default:
        return 'default'
        break;
    }
  } catch (error) {
    console.log(error)
    return 'ok'
  }
  //console.log(formatResult(result))

  return formatResult(result)

}