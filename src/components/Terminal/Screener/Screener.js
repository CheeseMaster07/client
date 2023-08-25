import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { setSearchedStocks_length_action, setSearchedStocks_action } from '../../../actions/stocks'

import '../../../css/terminal/Screener/screener.css'

import Header from './Header'
import { presets } from './Presets'
import Table from './Table/ScreenerTable'
import Customization from './Customization/Customization'


export default function Screener() {
  const [preset, setPreset] = useState('valuation')
  const [customize, setCustomize] = useState(false)
  const [presetList, setPresetList] = useState(presets[preset])
  const dispatch = useDispatch()

  function filterMaxMin(data) {
    const obj = {}
    data.map(item => {
      if (item.type == 'text') {
        obj[item.id] = {
          arr: [],
        }
      }
      else if (item.id) {
        obj[item.id] = {
          [item.desc]: {
            max: '',
            min: '',
          }
        }

      }
    });
    return obj
  }


  function yearsTransformer(yrs) {
    return `${yrs.split(' ')[0]} Years`
  }

  const stocks = useSelector((state) => state.stocks)
  const searchedStocks = useSelector((state) => state.searchedStocks)
  const searchQuery = useSelector((state) => state.searchQuery)

  const [filteredStocks, setFilteredStocks] = useState(searchedStocks)
  const [helpWithSorting, setHelpWithSorting] = useState()
  const [fireAfterFiltering, setFireAfterFiltering] = useState(false)
  const [filter, setFilter] = useState(filterMaxMin(presetList))
  const [sortBy, setSortBy] = useState({
    type: false
  })


  useEffect(() => {
    if (preset != '') {
      setPresetList([{ label: 'ticker', link: 'overview' }, ...presets[preset]])

    }

  }, [preset])

  useEffect(() => {
    // setFilteredStocks(filteredStocks
    //   .filter(stock => stock.general?.Name && stock?.ticker)
    //   .filter(stock => stock.general.Name.toLowerCase().startsWith(searchQuery.toLowerCase()) || stock.ticker.toLowerCase().startsWith(searchQuery.toLowerCase())))

  }, [searchQuery])

  useEffect(() => {
    console.log(presetList)
    if (JSON.stringify(presetList.filter(metric => metric.label !== 'ticker')) !== JSON.stringify(presets[preset])) {
      setPreset('')
    }
    setFilter(filterMaxMin(presetList))
    setFilteredStocks(searchedStocks)
    //console.log(searchedStocks)
  }, [presetList])

  useEffect(() => {
    dispatch(setSearchedStocks_length_action(filteredStocks.length))
  }, [filteredStocks])

  useEffect(() => {

    const resultStocks = []


    searchedStocks.forEach(stock => {
      let numOfRight = 0
      presetList.forEach(metric => {
        if (metric.label === 'ticker') return
        // console.log(filter[metric.id][metric.desc], metric)
        // console.log(filter[metric.id])
        if (metric.type == 'text') {
          if (filter[metric.id].arr.includes(stock.screenerData[metric.segment][metric.id][metric.desc]) || filter[metric.id].arr.length == 0) {
            numOfRight = numOfRight + 1
          }
        }
        if (filter[metric.id][metric.desc] == undefined) {
          filter[metric.id][metric.desc] = { max: '', min: '' }
        }

        let max = Infinity
        let min = -Infinity
        try {
          if (filter[metric.id][metric.desc]?.max === '') {
            max = Infinity
          } else {
            max = filter[metric.id][metric.desc]?.max
          }
          if (filter[metric.id][metric.desc]?.min === '') {
            min = -Infinity
          } else {
            min = filter[metric.id][metric.desc]?.min
          }

          switch (metric.desc.split(' | ').length) {
            case 1:
              if (stock.screenerData[metric.segment][metric.id][metric.desc.split(' | ')[0]] < max && stock.screenerData[metric.segment][metric.id][metric.desc.split(' | ')[0]] > min) {
                numOfRight = numOfRight + 1
              }
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
              if (stock.screenerData[metric.segment][metric.id][firstDescPart][secondDescPart] < max && stock.screenerData[metric.segment][metric.id][firstDescPart][secondDescPart] > min) {
                numOfRight = numOfRight + 1
              }
              break

            default:
              return 'default'
              break;
          }
        } catch (error) {
          // console.log(metric)
          // console.log(error)
        }

      })

      if (numOfRight >= presetList.length - 1) {
        resultStocks.push(stock)

      }

    })
    setFilteredStocks(resultStocks)
    setSearchedStocks_action(resultStocks)
    setFireAfterFiltering(true)

  }, [filter])


  useEffect(() => {
    setFilteredStocks(prevFilteredStocks => {

      let resultStocks = [];
      if (sortBy.type) {
        resultStocks = prevFilteredStocks.sort((a, b) => {

          if (sortBy.type == 'high') {
            if (filter[sortBy.id]?.arr) {
              const lowerA = a.screenerData.general[sortBy.id].Current.toLowerCase();
              const lowerB = b.screenerData.general[sortBy.id].Current.toLowerCase();
              if (lowerA < lowerB) {
                return -1;
              }
              if (lowerA > lowerB) {
                return 1;
              }
              return 0
            }
            switch (sortBy.desc.split(' | ').length) {
              case 1:
                return (b.screenerData[sortBy.segment][sortBy.id][sortBy.desc.split(' | ')[0]] - a.screenerData[sortBy.segment][sortBy.id][sortBy.desc.split(' | ')[0]])
                break;
              case 2:
                return (b.screenerData[sortBy.segment][sortBy.id][yearsTransformer(sortBy.desc.split(' | ')[0])][sortBy.desc.split(' | ')[1]] - a.screenerData[sortBy.segment][sortBy.id][yearsTransformer(sortBy.desc.split(' | ')[0])][sortBy.desc.split(' | ')[1]])

                break

              default:
                return 'default'
                break;
            }
          } else if (sortBy.type == 'low') {
            if (filter[sortBy.id]?.arr) {
              const lowerA = a.screenerData.general[sortBy.id].Current.toLowerCase();
              const lowerB = b.screenerData.general[sortBy.id].Current.toLowerCase();
              if (lowerA > lowerB) {
                return -1;
              }
              if (lowerA < lowerB) {
                return 1;
              }
              return 0
            }
            switch (sortBy.desc.split(' | ').length) {
              case 1:
                return (a.screenerData[sortBy.segment][sortBy.id][sortBy.desc.split(' | ')[0]] - b.screenerData[sortBy.segment][sortBy.id][sortBy.desc.split(' | ')[0]])
                break;
              case 2:
                return (a.screenerData[sortBy.segment][sortBy.id][yearsTransformer(sortBy.desc.split(' | ')[0])][sortBy.desc.split(' | ')[1]] - b.screenerData[sortBy.segment][sortBy.id][yearsTransformer(sortBy.desc.split(' | ')[0])][sortBy.desc.split(' | ')[1]])

                break

              default:
                return 'default'
                break;
            }
          }
        })
      } else {
        resultStocks = prevFilteredStocks.sort((a, b) => {
          const tickerA = a.ticker.toUpperCase(); // Convert to uppercase for case-insensitive sorting
          const tickerB = b.ticker.toUpperCase();

          if (tickerA < tickerB) {
            return -1;
          }
          if (tickerA > tickerB) {
            return 1;
          }
          return 0;
        })
      }
      return resultStocks;
    });

    setHelpWithSorting(sortBy)
    setFireAfterFiltering(false)

  }, [sortBy, fireAfterFiltering])


  return (
    <>
      <div className="statements-header" style={{ boxShadow: '0 2px 6px 1px rgba(0, 0, 0, .25)', padding: '25px 25px' }}>

        <Header
          preset={preset}
          setPreset={setPreset}
          customize={customize}
          setCustomize={setCustomize}

        />
      </div>
      <Table
        stocks={filteredStocks.slice(0, 100)}
        metrics={presetList}
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {customize ?
        <Customization presetList={presetList} setPresetList={setPresetList} />
        :
        ''}

    </>
  )
}
