import React from 'react'
import { connect } from 'react-redux'

import ListControls from './ListControls'
import MovieTile from './MovieTile'
import WatchSummary from './WatchSummary'

import './styles/css/Watchlist.css';

const Watchlist = ({movies, showControlPanel}) => (
  <div className="watchlist">
    { 
      showControlPanel && <ListControls movieCount={movies.length}/>
    }
    <section>
       {
        !showControlPanel && <WatchSummary/>
       }
        <div className={ showControlPanel ? "movieList" : "movieList2" }>
          {
            movies.map( movie =>
              <MovieTile key={movie.filename} movie={movie} />
            )
          }
        </div>
    </section>
  </div>
)

const mapStateToProps = state => {
  return {
    showControlPanel: state.app.showControlPanel
  }
}

export default connect(mapStateToProps)(Watchlist)
