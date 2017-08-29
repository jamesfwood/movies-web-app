import { put, takeLatest, call } from 'redux-saga/effects'
import { getList, getVideoDetails, getAppSettings } from './api/moviesApi'
import { addMovies, addVideos } from './actions/'

function* fetchMovies () {
  try {
    const data = yield getList()
    yield put(addMovies(data))
  } catch (e) {
      console.log("fetchMovies error", e)
    yield put(addMovies([]))
  }
}

function* fetchVideos (action) {
  try {
    const app = yield call(getAppSettings)

    console.log('appSettings', app)

    const data = yield call(getVideoDetails, action.tmdb_id, app[0].tmdbApiKey)
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
