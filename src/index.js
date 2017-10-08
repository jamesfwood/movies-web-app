import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import store, { history } from './store'
import { fetchMovies, setTmdbApiKey, addMovies, updateOrientation } from './actions/'

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './styles/css/index.css';

store.subscribe( () => {

  var state = store.getState();

  console.log("Changed state", state);
});

const loadMovies = () => {

  const list = JSON.parse(localStorage.getItem('movies-list'))
  const app = JSON.parse(localStorage.getItem('movies-app-settings'))

  if (list && app) {
    store.dispatch(setTmdbApiKey(app[0].tmdbApiKey))

    let movies = []

    for (const item of list) {
      const movie = JSON.parse(localStorage.getItem(item.filename))

      if (movie) {
        movies.push(movie)
        }
    
    }

    store.dispatch(addMovies(movies))
  }
  else {
    store.dispatch(fetchMovies())
  }
}

function orientationChanged() {

  if (Math.abs(window.orientation) === 90) {
    store.dispatch(updateOrientation('landscape'))
  }
  else {
    store.dispatch(updateOrientation('portrait'))
  }
  
}

if (window.orientation) {
  orientationChanged()

  window.addEventListener("orientationchange", orientationChanged)
}

loadMovies()

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('root')
);

registerServiceWorker();
