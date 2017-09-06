import React from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import './styles/css/Unmatched.css';

function convertMillis(millis) {
  
      let x = millis / 1000
      //var seconds = Math.floor(x % 60)
      x /= 60
      let minutes = Math.floor(x % 60)
      x /= 60
      let hours = Math.floor(x)
  
      return hours + "h " + minutes + "min";
  }

class UnmatchedTile extends React.Component {
  
  render() {
    
    const { movie } = this.props

    const duration = convertMillis(movie.duration)

    return (
      <div className='unmatchedTile'>
        <Link to={`/match/${movie.filename}`}>{movie.filename}</Link>
        <div>{duration}
        </div>
      </div>
    )
  }
}

const Unmatched = ({movies, failedMovies}) => (
      <div>      
        <h2>Unmatched movies</h2>

          <div className='unmatchedList'>
            {
              movies.map( (movie) =>
                <UnmatchedTile key={movie.filename} movie={movie} />
              )
            }
          </div>
          
          <div className='unmatchedList'>
            <p>IMDB data failed to load properly</p>
            {
              failedMovies.map( (movie) =>
                <UnmatchedTile key={movie.filename} movie={movie} />
              )
            }
          </div>
      </div>
)

const mapStateToProps = state => {
  return {
    movies: state.movies.filter( movie => { return !movie.tmdb }),
    failedMovies: state.movies.filter( movie => { return movie.imdb === null })
  }
}

export default connect(mapStateToProps)(Unmatched)
