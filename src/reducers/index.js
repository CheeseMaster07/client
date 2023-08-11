import { combineReducers } from 'redux';
import { stocks, oneStock, searchedStocks } from './stocks';
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
  // coordinates: setCoordinates,

});

export default rootReducer;