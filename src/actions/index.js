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

export const addMovie = (movie) => {
  return {
    type: 'ADD_MOVIE',
    movie
  }
}

export const addMovies = (movies) => {
  return {
    type: 'ADD_MOVIES',
    movies
  };
}

export const setTmdbApiKey = (key) => {
  return {
    type: 'SET_TMDB_API_KEY',
    key
  }
}

export const fetchVideos = (tmdb_id, tmdbApiKey) => {
  return {
    type: 'FETCH_VIDEOS',
    tmdb_id,
    tmdbApiKey
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

export var updateMovie = (filename, imdb, tmdb) => {
    return {
        type: 'UPDATE_MOVIE',
        filename,
        imdb,
        tmdb
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