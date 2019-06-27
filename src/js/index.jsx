import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import movieReducer from './MovieSearchContainer/movieReducer';
import App from './app';

/* eslint-disable no-underscore-dangle */
// was window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  get: movieReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(promiseMiddleware(), thunk))
);
/* eslint-enable */

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
