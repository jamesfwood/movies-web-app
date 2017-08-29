export const fetchAppSettings = () => {
  return {
    type: 'FETCH_APP_SETTINGS'
  }
}

export const fetchMovies = () => {
  return {
    type: 'FETCH_MOVIES'
  }
}

export const addMovies = (movies) => {
  return {
    type: 'ADD_MOVIES',
    movies
  };
}


export const fetchVideos = tmdb_id => {
  return {
    type: 'FETCH_VIDEOS',
    tmdb_id
  }
}

export const addVideos = (tmdb_id, videos) => {
    return {
        type: 'ADD_VIDEOS',
        tmdb_id,
        videos
    }
}

export const changeSortOrder = (order) => {
  return {
    type: 'CHANGE_SORT_ORDER',
    order
  }
}

export const updateGenre = (name, display) => {
    return {
        type: 'UPDATE_GENRE',
        name,
        display
    }
}

export const updateAllGenres = (display) => {
    return {
      type: 'UPDATE_ALL_GENRES',
      display
    }
}

export const sortBy = (name) => {
    return {
        type: 'SORT_BY',
        name
    }
}

export const setRuntimeRange = (runtimeRange) => {
    return {
        type: 'SET_RUNTIME_RANGE',
        runtimeRange
    }
}