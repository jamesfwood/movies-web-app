import React from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import theMovieDb from 'themoviedb-javascript-library'

import { getImdb, updateTheMovieDbIDs, getMovieDetails } from './api/moviesApi'

import { updateMovie } from './actions/'
import { AcceptButton } from './Buttons'

import './styles/css/MatchMovie.css'

// Find "space" character
function getSpace(str) {

    var count_dot = 0;
    var count_space = 0;
    var count_dash = 0;

    for (var i = 0; i < str.length; i++) {
        if (str[i] === '.') count_dot++;
        if (str[i] === ' ') count_space++;
        if (str[i] === '-') count_dash++;
    }

    if (count_dot > count_space && count_dot > count_dash)
        return '.';
    if (count_space > count_dot && count_space > count_dash)
        return ' ';
    if (count_dash > count_dot && count_dash > count_dot)
        return '-';
        
    return '.'
}

function findYearPosition(words) {

    for (var i = 0; i < words.length; i++) {

        var year = parseInt(words[i], 10);

        if (year > 1900 && year < new Date().getFullYear() + 4) {
            return { index: i, year }
        }
    }

    return { index: -1 };
}

function parseMovieFilename(filename)
{
    var title = '';

    var space = getSpace(filename);
    var words = filename.split(space);

    var yearData = findYearPosition(words);

    if (yearData.year) {
        
        for (var i = 0; i < yearData.index; i++) {
            title += words[i].trim() + ' ';
        }
    }

    title = title.trim();

    console.log("words", words);
    console.log("yearData", yearData);
    console.log("title:", title);

    return { title, year: yearData.year };
}

function convertMillis(millis) {

    var x = millis / 1000
    var seconds = Math.floor(x % 60)
    x /= 60
    var minutes = Math.floor(x % 60)
    x /= 60
    var hours = Math.floor(x)

    return hours + " hr " + minutes + " min " + seconds + " sec";
}

function removeNulls(obj) {
    Object.keys(obj).forEach( key => {
        if (!obj[key])
            delete obj[key]
        else if (typeof obj[key] === 'object') {
            removeNulls(obj[key])
        }
    })
}

class MatchMovie extends React.Component {

    constructor(props) {
        super(props);

        this.state = { search: [] };
    }
    
    componentDidMount() {

        const {movie} = this.props

        if (movie) {
            const searchDetails = parseMovieFilename(movie.filename)

            this.updateSearch(searchDetails)
        }
    }

    updateSearch = (searchDetails) => {
        
        if (searchDetails.title !== '') {
            const self = this

            theMovieDb.common.api_key = this.props.apiKey

            theMovieDb.search.getMovie({query: searchDetails.title, include_adult: false, year: searchDetails.year  }, (res) => {
                var result = JSON.parse(res);
                console.log("Called theMovieDb:search.getMovie", result)

                self.setState( {search: result.results});
            }, (e) => {

            });
        }
    }

    onFormSubmit(e) {
        e.preventDefault();

        this.updateSearch({ title: this.refs.title.value });
    }

    handleIgnoreClick = (tmdb_id) => {

        alert("Not yet implemented");
    }
    

    handleAcceptClick = (tmdb_id) => {
        
        const {movie, updateMovie, apiKey} = this.props
        const self = this

        this.setState( { tmdb_id,
                        apiKey } )


        // TODO: Do this with yield??
        getMovieDetails(tmdb_id, apiKey).then( tmdb => {

            self.setState( {debug: 'I am done with getMovieDetails!!!'} )

            //Object.keys(tmdb).forEach( key => !tmdb[key] && delete tmdb[key] )
            
            removeNulls(tmdb)

            self.setState( {debug: 'I am done with cleaning tmdb!'} )

            self.setState( {tmdb: JSON.stringify(tmdb)} )

            console.log("tmdb", tmdb)

            const imdb_id = tmdb.imdb_id.substring(2)

            getImdb(imdb_id).then( imdb => {

                self.setState( {imdb: JSON.stringify(imdb)} )

                removeNulls(imdb)

                //Object.keys(imdb).forEach( key => !imdb[key] && delete imdb[key] )

                console.log("imdb", imdb)

                updateTheMovieDbIDs(movie.filename, imdb, tmdb).then( updatedMovie => {

                    self.setState( {updatedMovie: JSON.stringify(updatedMovie)} )

                    console.log("updatedMovie", updatedMovie)

                    updateMovie(updatedMovie.filename, imdb, tmdb)
                })
            })
        })
    }

    render() {

        const {movie, history} = this.props

        const renderSearchImage = (search) => {

            if (search.poster_path) {
                return (
                    <img src={'http://image.tmdb.org/t/p/w154/' + search.poster_path} alt="Not Found" width='154'/>
                )
            }
        }

        const renderDebug = () => {

            if (this.state.debug) {
                return (
                    <div>Debug:
                        <a>{this.state.debug}</a>
                    </div>
                )
            }
        }

        const renderTmdbDebug = () => {

            if (this.state.tmdb) {
                return (
                    <div>TheMovieDb:
                        <a>{this.state.tmdb}</a>
                    </div>
                )
            }
        }

        const renderImdbDebug = () => {

            if (this.state.imdb) {
                return (
                    <div>IMDb:
                        <a>{this.state.imdb}</a>
                    </div>
                )
            }
        }

        const renderUpdatedDebug = () => {

            if (this.state.updatedMovie) {
                return (
                    <div>Updated Movie:
                        <a>{this.state.updatedMovie}</a>
                    </div>
                )
            }
        }

        const renderAcceptedDebug = () => {

            if (this.state.tmdb_id) {
                return (
                    <div>Clicked button!  
                        <a>tmdb_id: {this.state.tmdb_id}</a>
                        <a>apiKey: {this.state.apiKey}</a>
                    </div>
                )
            }
        }

        if (!movie) {
            return (
                <div>Loading...</div>
            )
        }
        else if (movie.tmdb) {

            const detailsLink = '/movie/' + encodeURIComponent(movie.filename)

            return (
                <div>
                    <h3>{movie.filename}</h3>
                    <p>Duration: {convertMillis(movie.duration)}</p>
                    <p>The Movie DB ID is now: {movie.tmdb.id}</p>
                    <p>IMDB ID is now: {movie.imdb.id}</p>
                    <button onClick={() => history.push(detailsLink)}>Go to Movie Details</button>
                </div>
            )
        }
        else if (movie.duration) {
            return (
                <section className='container'>
                    <h2>Unmatched Movie</h2>

                    <form onSubmit={this.onFormSubmit.bind(this)}>
                        <input type="text" ref="title" placeholder="Search title..."/>
                        <button>Search</button>
                    </form>

                    <h2>Filename: {movie.filename}</h2>
                    <p>Duration: {convertMillis(movie.duration)}</p>
                    <p>Full Path: {movie.mediaInfo.File.track[0].Complete_name}</p>
                    <button onClick={this.handleIgnoreClick.bind(this)}>Ignore</button>

                    <ul>
                    {
                        this.state.search.map( (search) =>
                            <li key={search.id}>
                            { renderSearchImage(search) }                       
                            <div>
                                <h5>{search.title}</h5>
                                <p>Release Date: {search.release_date}</p>
                                <p>{search.overview}</p>
                                <AcceptButton id={search.id} text={'Accept'} onClick={this.handleAcceptClick} />
                                { renderDebug() }
                                { renderAcceptedDebug() }
                                { renderTmdbDebug() }
                                { renderImdbDebug() }
                                { renderUpdatedDebug() }
                            </div>
                            </li>
                        )
                    }
                </ul>
                </section>
            )
        }
    }
}

const mapStateToProps = (state, {match}) => {
    
    const filename = decodeURIComponent(match.params.filename);

    return {
        movie: state.movies.find(m => m.filename === filename),
        apiKey: state.app.tmdbApiKey
    }
}

const mapDispatchToProps = dispatch => {
  return {
    updateMovie: (filename, imdb, tmdb) => {
      dispatch(updateMovie(filename, imdb, tmdb))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MatchMovie))
