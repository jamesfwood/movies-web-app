import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import VisibleWatchlist from './VisibleWatchlist'
import Charting from './Charting'
import MovieDetails from './MovieDetails'
import Unmatched from './Unmatched'
import MatchMovie from './MatchMovie'
import Settings from './Settings'
import NotFound from './NotFound'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/watchlist' component={VisibleWatchlist}/>
      <Route exact path='/unmatched' component={Unmatched}/>
      <Route exact path='/charting' component={Charting}/>
      <Route exact path='/match/:filename' component={MatchMovie}/>
      <Route exact path='/movie/:filename' component={MovieDetails}/>
      <Route exact path='/' component={Home}/>
      <Route exact path='/settings' component={Settings}/>
      <Route component={NotFound}/>
    </Switch>
  </main>
)

export default Main
