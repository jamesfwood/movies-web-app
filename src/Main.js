import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import VisibleWatchlist from './VisibleWatchlist'
import MovieDetails from './MovieDetails'
import NotFound from './NotFound'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/watchlist' component={VisibleWatchlist}/>
      <Route exact path='/movie/:filename' component={MovieDetails}/>
      <Route exact path='/' component={Home}/>
      <Route component={NotFound}/>
    </Switch>
  </main>
)

export default Main