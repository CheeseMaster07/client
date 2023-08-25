import { combineReducers } from 'redux';
import { stocks, oneStock, searchedStocks, searchedStocksLength, searchQuery } from './stocks';
import { monthlyAnnually } from './pricing';
import { tableState } from './table';
import { valuationState } from './analysis';
import { setCoordinates } from './chart';
import auth from './auth';

const rootReducer = combineReducers({
  stocks: stocks,
  oneStock: oneStock,
  searchedStocks: searchedStocks,
  auth: auth,
  monthlyAnnually: monthlyAnnually,
  tableState: tableState,
  valuationState: valuationState,
  searchedStocksLength: searchedStocksLength,
  searchQuery: searchQuery,
  // coordinates: setCoordinates,

});

export default rootReducer;