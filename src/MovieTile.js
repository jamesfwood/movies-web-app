import React from 'react'

import {withRouter} from 'react-router-dom'

import './styles/css/MovieTile.css';

function convertMillis(millis) {

    let x = millis / 1000
    //var seconds = Math.floor(x % 60)
    x /= 60
    let minutes = Math.floor(x % 60)
    x /= 60
    let hours = Math.floor(x)

    return hours + "h " + minutes + "min";
}

const MovieTile = ({movie, history}) => {
    
    //const movie = props;

    const runtime = convertMillis(movie.duration);
    let mpaa = "Not Rated";

    if (movie.imdb.mpaa_rating) {
        mpaa = movie.imdb.mpaa_rating
    }

    let genre = "";

    for (let i = 0; i < movie.imdb.genres.length && i <= 2; i++) {
        genre += movie.imdb.genres[i] + ', '
    }
    
    genre = genre.slice(0, -2);

    const detailsLink = '/movie/' + encodeURIComponent(movie.filename)

    return (
        <article className="movieTile">
            <div>
                <img className="movieImg" src={'https://image.tmdb.org/t/p/w342' + movie.tmdb.poster_path} alt="Poster"/>
            </div>
            <div className="movieDetails">
                <div>{movie.imdb.title} ({movie.imdb.year})</div>
                <div>{mpaa} | {runtime} | {movie.imdb.rating}</div>
                <div>{genre}</div>
            </div>
            <div className="movieSelected">
                <button onClick={() => history.push(detailsLink)}>Details</button>
            </div>
        </article>
    )
}
 
/*
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: url => push(url)
}, dispatch)

export default connect(null, mapDispatchToProps)(MovieTile)
*/

export default withRouter(MovieTile);