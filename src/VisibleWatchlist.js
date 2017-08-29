import { connect } from 'react-redux'
import Watchlist from './Watchlist'

const sortTitleAsc = (a, b) => {

    if (a.imdb.title === b.imdb.title)
        return a.imdb.year - b.imdb.year;

    return a.imdb.title.toLowerCase() < b.imdb.title.toLowerCase() ? -1 : 1;
}

const sortTitleDesc = (a, b) => {

    if (a.imdb.title === b.imdb.title)
        return b.imdb.year - a.imdb.year;

    return b.imdb.title.toLowerCase() < a.imdb.title.toLowerCase() ? -1 : 1;
}

const sortReleaseDateAsc = (a, b) => {

    return (new Date(a.tmdb.release_date).getTime()) - (new Date(b.tmdb.release_date).getTime());
}
const sortReleaseDateDesc = (a, b) => {

    return (new Date(b.tmdb.release_date)).getTime() - (new Date(a.tmdb.release_date)).getTime();
}

const sortDurationAsc = (a, b) => {
    return a.duration - b.duration;
}

const sortDurationDesc = (a, b) => {
    return b.duration - a.duration;
}

const sortImdbRatingAsc = (a, b) => {
    return a.imdb.rating - b.imdb.rating;
}
const sortImdbRatingDesc = (a, b) => {
    return b.imdb.rating - a.imdb.rating;
}

const sortBudgetAsc = (a, b) => {
    return a.tmdb.budget - b.tmdb.budget;
}

const sortBudgetDesc = (a, b) => {
    return b.tmdb.budget - a.tmdb.budget;
}

const getVisibleMovies = (movies, filters) => {

    let movieList = movies.filter(m => {
        return m.imdb !== undefined
    })

    movieList = movieList.filter(m => (m.duration / 1000 / 60) >= filters.runtimeRange[0] && (m.duration / 1000 / 60) <= filters.runtimeRange[1]);

    movieList = movieList.filter(m => {
        for (const g of filters.genres) {

            if (!g.display)
                continue

            for (const mg of m.imdb.genres) {
                if (g.name === mg) {
                    return true;
                }
            }
        }

        return false;
    })

    let sortfunc = sortTitleAsc;

    switch (filters.sortBy) {
        case 'title':
            console.log("sortby title");
            sortfunc = filters.sortOrder === 'asc' ? sortTitleAsc : sortTitleDesc;
            break;

        case 'runtime':
            console.log("sortby runtime");
            sortfunc = filters.sortOrder === 'asc' ? sortDurationAsc : sortDurationDesc;
            break;

        case 'imdbRating':
            console.log("sortby imdbRating");
            sortfunc = filters.sortOrder === 'asc' ? sortImdbRatingAsc : sortImdbRatingDesc;
            break;

        case 'releaseDate':
            console.log("sortby releaseDate");
            sortfunc = filters.sortOrder === 'asc' ? sortReleaseDateAsc : sortReleaseDateDesc;
            break;

        case 'budget':
            console.log("sortby budget");
            sortfunc = filters.sortOrder === 'asc' ? sortBudgetAsc : sortBudgetDesc;
            break;

        default:

    }

    return movieList.sort( sortfunc );
}

const mapStateToProps = state => {
  return {
    movies: getVisibleMovies(state.movies, state.filters)
  }
}

export default connect(mapStateToProps)(Watchlist)