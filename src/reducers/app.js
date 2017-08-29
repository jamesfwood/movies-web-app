

const initalState = {
    loading_movies: false,
    nMoviesAcross: 4,
    user: 'jamesfwood@hotmail.com'
}

const appReducer = (state = initalState, action) => {
  switch (action.type) {
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
        
    default:
      return state;
  }
};

export default appReducer
