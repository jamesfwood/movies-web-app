import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'

import { fetchMovies } from './actions/'

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './styles/css/index.css';

store.subscribe( () => {

  var state = store.getState();

  console.log("Changed state", state);
});

store.dispatch(fetchMovies())

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('root')
);

registerServiceWorker();
