import React from 'react'

import { connect } from 'react-redux'
import { fetchVideos } from './actions/'

import './styles/css/MovieDetails.css';

class MovieDetails extends React.Component {
    
    componentDidMount() {

        const {dispatch, movie} = this.props;

        if (movie && !movie.videos) {

            dispatch(fetchVideos(movie.tmdb.id))
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
                <div>{movie.imdb.title} ({movie.imdb.year})</div>
                <div>IMDB Rating: {movie.imdb.rating}</div>
           
                <div>Filename: {movie.filename}</div>
                { renderVideoLink() }
            </div>
        )
    }
}

const mapStateToProps = (state, {match}) => {

    const filename = decodeURIComponent(match.params.filename);

  return {
    movie: state.movies.find(m => m.filename === filename)
  }
}

export default connect(mapStateToProps)(MovieDetails)