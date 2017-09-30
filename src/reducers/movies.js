
const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_VIDEOS':
        return state.map( (movie) => 
            (movie.tmdb && movie.tmdb.id === action.tmdb_id) ? 
                { 
                    ...movie,
                    loading_videos: true
                } 
                : movie
            )
    case 'ADD_MOVIE':
            return [
                ...state,
                action.movie
            ]
    case 'ADD_MOVIES':
      return [
        ...state,
        ...action.movies
      ];
    case 'ADD_VIDEOS':
        return state.map( (movie) => 
            (movie.tmdb && movie.tmdb.id === action.tmdb_id) ? 
                { 
                    ...movie,
                    videos: action.videos,
                    loading_videos: false
                } 
                : movie
            )
    case 'UPDATE_MOVIE':
        return state.map((movie) => {
            if (movie.filename === action.filename) {

                return {
                    ...movie,
                    imdb: action.imdb,
                    tmdb: action.tmdb
                }
            }
            else {
                return movie;
            }
        });
    case 'CLEAR_LIST':
        return []
    default:
      return state;
  }
};

export default moviesReducer
