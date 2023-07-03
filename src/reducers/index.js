import { combineReducers } from 'redux';
import { stocks, oneStock } from './stocks';

const rootReducer = combineReducers({
  stocks: stocks,
  oneStock: oneStock

});

export default rootReducer;