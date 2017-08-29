import axios from 'axios'


//const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=c4e735ea8bd7e7b6dc8368c752517b2d&units=imperial';
const MOVIES_URL = 'https://fqovjplf1b.execute-api.us-west-2.amazonaws.com/prod/movies';
const MOVIE_URL = 'https://fqovjplf1b.execute-api.us-west-2.amazonaws.com/prod/movie';

const MOVIE_APP_URL = 'https://fqovjplf1b.execute-api.us-west-2.amazonaws.com/prod/app';

const IMDB_URL = 'http://localhost:3000/imdb?id=';

const fetchJson = url => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }

      return response.json();
    });
}

export const getAppSettings = () => {

  return fetchJson(MOVIE_APP_URL)
}

export const getVideoDetails = (tmdb_id, apiKey) => {

  const url = 'https://api.themoviedb.org/3/movie/' + tmdb_id + '/videos?api_key=' + apiKey + '&language=en-US'

  return fetchJson(url)
}

export const getList = () => {
//    var encodedLocation = encodeURIComponent(location);
//    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;
    var requestUrl = MOVIES_URL;

    return axios.get(requestUrl).then(function (res) {

//      if (res.data.cod && res.data.Items[1].tmdb_id) {
  //      throw new Error(res.data.message);
  //    } else {
        console.log("Called MoviesApi:getList", res.data);

        return res.data;
  //    }
    }, function (res) {
      throw new Error(res.data.message);
    });
  }

export const getMovie = (filename) =>  {
    var encFilename = encodeURIComponent(filename);
    var requestUrl = `${MOVIE_URL}/${encFilename}`;

    return axios.get(requestUrl).then(function (res) {

        console.log("Called MoviesApi:getMovie", res.data.Items);

        return res.data.Items;
    }, function (res) {
      throw new Error(res.data.message);
    });
  }

export const getImdb = (imdb_id) => {
    var requestUrl = IMDB_URL + imdb_id;

    return axios.get(requestUrl).then(function (res) {

//      if (res.data.cod && res.data.Items[1].tmdb_id) {
  //      throw new Error(res.data.message);
  //    } else {
        console.log("Called MoviesApi:getImdb", res.data);

        return res.data;
  //    }
    }, function (res) {
      throw new Error(res.data.message);
    });
  }

export const updateTheMovieDbIDs = (filename, imdb, tmdb) => {

    var requestUrl = MOVIE_URL;

    var body = {
    filename,
    imdb,
    tmdb
    };

    return axios.put(requestUrl, body).then( res => {
        return res.data;
    }).catch(e => {
        throw new Error(e.data.message);
    });
}

