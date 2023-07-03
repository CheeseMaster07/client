import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter, useLocation } from 'react-router-dom'
import thunk from 'redux-thunk'

import reducers from './reducers/'

import App from './App'

import './css/general.css'


const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)