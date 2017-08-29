
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
    default:
      return state;
  }
};

export default moviesReducer
