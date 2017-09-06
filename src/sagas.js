import { put, takeLatest, call, all } from 'redux-saga/effects'
import { getList, getMovie, getVideoDetails, getAppSettings } from './api/moviesApi'
import { addMovies, addMovie, addVideos, setTmdbApiKey } from './actions/'

function* fetchMovies () {
  try {
    const [data, app] = yield all([getList(), call(getAppSettings)])

    yield put(setTmdbApiKey(app[0].tmdbApiKey))

    let movies = []

    for (const item of data) {
      const movie = JSON.parse(localStorage.getItem(item.filename))

      if (movie) {
        
        if (item.updated === movie.updated) {

          movies.push(movie)
        }
        else {
          const movie = yield getMovie(item.filename)

          if (movie.filename) {
            localStorage.setItem(movie.filename, JSON.stringify(movie))

            yield put(addMovie(movie))
          }
          else {
            console.log("error fetching movie", item, movie)
          }
        }
      }
      else {
          const movie = yield getMovie(item.filename)

          if (movie.filename) {
            localStorage.setItem(movie.filename, JSON.stringify(movie))

            yield put(addMovie(movie))
          }
          else {
            console.log("error fetching movie", item, movie)
          }
      }
    }

    yield put(addMovies(movies))
  } catch (e) {
      console.log("fetchMovies error", e)
    yield put(addMovies([]))
  }
}

function* fetchVideos (action) {
  try {
    const data = yield call(getVideoDetails, action.tmdb_id, action.tmdbApiKey)
    yield put(addVideos(action.tmdb_id, data.results))
  } catch (e) {
      console.log("fetchVideos error", e)
      // TODO: Handle errors properly
    yield put(addVideos(action.tmdb_id, []))
  }
}

export default function* rootSaga () {
  yield takeLatest('FETCH_MOVIES', fetchMovies)
  yield takeLatest('FETCH_VIDEOS', fetchVideos)
}
