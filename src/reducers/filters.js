
const genres = [    { name: 'Action', display: true },
                    { name: 'Adventure', display: true },
                    { name: 'Animation', display: true },
                    { name: 'Biography', display: true },
                    { name: 'Comedy', display: true },
                    { name: 'Crime', display: true },
                    { name: 'Documentary', display: true },
                    { name: 'Drama', display: true },
                    { name: 'Family', display: true },
                    { name: 'Fantasy', display: true },
                    { name: 'Film-Noir', display: true },
                    { name: 'History', display: true },
                    { name: 'Horror', display: true },
                    { name: 'Music', display: true },
                    { name: 'Musical', display: true },
                    { name: 'Mystery', display: true },
                    { name: 'Romance', display: true },
                    { name: 'Sci-Fi', display: true },
                    { name: 'Sport', display: true },
                    { name: 'Thriller', display: true },
                    { name: 'War', display: true },
                    { name: 'Western', display: true }
                ]

const sortTypes = [ { name: 'Title', value: 'title'}, 
                    { name: 'Runtime', value: 'runtime'}, 
                    { name: 'IMDb Rating', value: 'imdbRating'}, 
                    { name: 'Release Date', value: 'releaseDate'}, 
                    { name: 'Budget', value: 'budget'}
                ]

const filtersDefault = {
    sortBy: 'title',    // title, runtime, rating, releasedate, Genre, imdbRating, tmdbRating, rottenTomatoesRating, budget, revenue
    sortOrder: 'asc',   // asc, desc
    runtimeRange: [0, 500],
    genres,
    sortTypes,
    movieCount: 0
}

// Filters:
// title search bar
// runtime (min, max, slider bar)
// rating (multi-select from R, PG, PG-13, NC-17, etc...)
// releaseDate (start date, end date (or no end date)  Date pickers)
// genre (multi-select from Action, Drama, Documentary, etc...)
// imdbRating (min, slider bar)
// rottenTomatoesRating (min, slider bar)
// theMovieDbRating (min, slider bar)
// budget (min, max?)  Blockbuster movies, etc...
// revenue (min)  Big hits
// revenue / budget  Big suprise hits
// actors

const filtersReducer = (state = filtersDefault, action) => {
    switch (action.type) {
        case 'SET_RUNTIME_RANGE':
            return {
                ...state,
                runtimeRange: action.runtimeRange
            }

        case 'SORT_BY':
            return {
                ...state,
                sortBy: action.name
            }

        case 'UPDATE_GENRE':

            let genres = state.genres.slice()

            genres.find(g => g.name === action.name).display = action.display
            
            return {
                ...state,
                genres
            }
        /*
        case 'UPDATE_FILTERED_MOVIE_COUNT':

            return {
                ...state,
                movieCount: action.count
            }
*/
        case 'UPDATE_ALL_GENRES':

            let g = state.genres.slice()

            for (let genre of g) {
                genre.display = action.display
            }
            
            return {
                ...state,
                g
            }

        case 'CHANGE_SORT_ORDER':
            return {
                ...state,
                sortOrder: action.order
            }

        case 'SET_GENRE':
            return {
                ...state,
                genre: action.genre
            }

        default:
            return state;
    }
}

export default filtersReducer
