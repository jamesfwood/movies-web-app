import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import appReducer from './app'
import moviesReducer from './movies'
import filtersReducer from './filters'

export default combineReducers({
  app: appReducer,
  router: routerReducer,
  movies: moviesReducer,
  filters: filtersReducer
})
