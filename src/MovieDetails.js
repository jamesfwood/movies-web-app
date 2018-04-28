import React from 'react'

import { connect } from 'react-redux'
import { fetchVideos } from './actions/'

import './styles/css/MovieDetails.css';

class MovieDetails extends React.Component {
    
    componentDidMount() {

        const {dispatch, movie, apiKey} = this.props

        if (movie && !movie.videos) {

            dispatch(fetchVideos(movie.tmdb.id, apiKey))
        }
    }

    render() {

        const {movie} = this.props

        if (!movie) {
            return (
                <div>Loading...</div>
            )
        }

        /*
        const backgroundUrl = 'https://image.tmdb.org/t/p/w780' + movie.tmdb.backdrop_path

        const detailsStyle = {
            width: '100vh',
            height: '100vh',
            'background-repeat': 'no-repeat',
            'background-size': 'cover',
            backgroundImage: 'url(' + backgroundUrl + ')'
        }
*/

        const renderVideoLink = () => {
            if (movie.videos) {

                const src = 'https://www.youtube.com/embed/' + movie.videos[0].key

                return (
                <iframe title='movie' width="520" height="345" src={src}>
                                    </iframe>)
            }
        }

        return (
            <div className="movieDetails">
                <div>
                <img className="movieImg" src={'https://image.tmdb.org/t/p/w154' + movie.tmdb.poster_path} alt="Poster"/>
                </div>
                <div>{movie.omdb.Title} ({movie.omdb.Year})</div>
                <div>IMDB Rating: {movie.omdb.imdbRating}</div>
                <br/>
                <div>Plot: {movie.omdb.Plot}</div>
                <br/>
                <div>Overview: {movie.tmdb.overview}</div>
                <br/>
                <div>Filename: {movie.filename}</div>
                { renderVideoLink() }
            </div>
        )
    }
}

const mapStateToProps = (state, {match}) => {

    const filename = decodeURIComponent(match.params.filename);

  return {
    movie: state.movies.find(m => m.filename === filename),
    apiKey: state.app.tmdbApiKey
  }
}

export default connect(mapStateToProps)(MovieDetails)