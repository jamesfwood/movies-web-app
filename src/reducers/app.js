

const initalState = {
    loading_movies: false,
    nMoviesAcross: 4,
    user: 'jamesfwood@hotmail.com',
    tmdbApiKey: '',
    showControlPanel: false,
    orientation: 'N/A'
}

const appReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'UPDATE_ORIENTATION':
        return {
            ...state,
            orientation: action.orientation
        }
    case 'SHOW_CONTROL_PANEL':
        return {
            ...state,
            showControlPanel: action.display
        }
    case 'FETCH_MOVIES':
        return {
                    ...state,
                    loading_movies: true
        }
    case 'ADD_MOVIES':
        return {
                    ...state,
                    loading_movies: false
        }

    case 'FETCH_APP_SETTINGS':
        return {
            ...state
        }

    case 'SET_TMDB_API_KEY':
        return {
            ...state,
            tmdbApiKey: action.key
        }
        
    default:
      return state;
  }
};

export default appReducer
