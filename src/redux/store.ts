import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './rootReducer'

const loggerMiddleware = store => next => action => {
  const result = next(action)
  console.log('Middleware', result)
  console.log('Middleware', store.getState())
  return result
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = (typeof window !== 'undefined'
    && (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose))
  || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(
  loggerMiddleware,
  thunk
)))

export default store
