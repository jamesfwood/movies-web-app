import React from 'react'

import ListControls from './ListControls'
import MovieTile from './MovieTile'

import './styles/css/Watchlist.css';

const Watchlist = ({movies}) => (
  <div className="watchlist">
    <ListControls />
    <section>
        <div className="movieList">
          {
            movies.map( movie =>
              <MovieTile key={movie.filename} movie={movie} />
            )
          }
        </div>
    </section>
  </div>
)

export default Watchlist
