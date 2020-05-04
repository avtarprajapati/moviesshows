import themoviedb from '../apis/themoviedb';
import {
  FETCH_SEARCH_VALUE,
  FETCH_VIDEO_ID,
  FETCH_MOVIE_DETAILS,
  FETCH_POPULAR_MOVIE,
  FETCH_TRENDING_MOVIE,
  FETCH_TOP_RATED_MOVIE,
  FETCH_UPCOMING_MOVIE,
  FETCH_NOW_PLAYING_MOVIE,
  FETCH_TV_DETAILS,
  FETCH_POPULAR_TV,
  FETCH_TRENDING_TV,
  FETCH_TOP_RATED_TV,
  FETCH_AIRING_TODAY__TV,
  FETCH_ON_THE_AIR__TV
} from './typeConfig';

const url = (path, page, query = null) => {
  return themoviedb.get(path, {
    params: {
      api_key: '6625deddd4ccf0e5c36110f7e6b9274e',
      language: 'en-US',
      page: page,
      query
    }
  });
};

export const fetchSearch = (type, page = 1, query) => async (dispatch) => {
  const responseSearch = await url(`/search/${type}`, page, query);

  const searchResult = responseSearch.results.map((value) => {
    return {
      id: value.id,
      title: value.title,
      overview: value.overview,
      release_date: value.release_date,
      poster_path: value.poster_path
    };
  });

  dispatch({
    type: FETCH_SEARCH_VALUE,
    payload: searchResult
  });
};

// youtube id
export const youtubeId = (type, id) => async (dispatch) => {
  const videoDetails = await url(`/${type}/${id}/videos`);

  dispatch({
    type: FETCH_VIDEO_ID,
    payload: videoDetails.data
  });
};

export const fetchMoviesDetails = (id, page = 1) => async (dispatch) => {
  const repsonseMovieDetails = await url(`/movie/${Number(id)}`, page);

  const videoDetails = await url(`/movie/${id}/videos`);

  const {
    title,
    backdrop_path,
    poster_path,
    overview,
    release_date,
    vote_average,
    genres,
    budget,
    revenue,
    runtime
  } = repsonseMovieDetails.data;

  const movieDetails = {
    id,
    title,
    backdrop_path,
    poster_path,
    overview,
    release_date,
    score: vote_average,
    genres,
    budget,
    revenue,
    runtime,
    type: 'movie'
    // youtube_key: videoDetails.data.results[0].key
  };

  dispatch({
    type: FETCH_MOVIE_DETAILS,
    payload: movieDetails
  });
};

export const fetchPopularMovies = (page = 1) => async (dispatch) => {
  const response = await url(`/movie/popular`, page);

  const popularMovie = response.data.results.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      backdrop_path: movie.backdrop_path,
      poster_path: movie.poster_path,
      overview: movie.overview,
      release_date: movie.release_date,
      score: movie.vote_average,
      type: 'movie'
    };
  });

  dispatch({
    type: FETCH_POPULAR_MOVIE,
    payload: popularMovie
  });
};

export const fetchTrendingMovie = (page = 1) => async (dispatch) => {
  const response = await url(`/trending/movie/day`, page);

  const trendingMovie = response.data.results.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      backdrop_path: movie.backdrop_path,
      poster_path: movie.poster_path,
      overview: movie.overview,
      release_date: movie.release_date,
      score: movie.vote_average,
      type: 'movie'
    };
  });

  dispatch({
    type: FETCH_TRENDING_MOVIE,
    payload: trendingMovie
  });
};

export const fetchTopRatedMovies = (page = 1) => async (dispatch) => {
  const response = await url(`/movie/top_rated`, page);

  const topRatedMovie = response.data.results.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      backdrop_path: movie.backdrop_path,
      poster_path: movie.poster_path,
      overview: movie.overview,
      release_date: movie.release_date,
      score: movie.vote_average,
      type: 'movie'
    };
  });

  dispatch({
    type: FETCH_TOP_RATED_MOVIE,
    payload: topRatedMovie
  });
};
export const fetchUpcomingMovies = (page = 1) => async (dispatch) => {
  const response = await url(`/movie/upcoming`, page);

  const upcomingMovie = response.data.results.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      backdrop_path: movie.backdrop_path,
      poster_path: movie.poster_path,
      overview: movie.overview,
      release_date: movie.release_date,
      score: movie.vote_average,
      type: 'movie'
    };
  });

  dispatch({
    type: FETCH_UPCOMING_MOVIE,
    payload: upcomingMovie
  });
};

export const fetchNowPlayingMovies = (page = 1) => async (dispatch) => {
  const response = await url(`/movie/now_playing`, page);

  const nowPlayingMovie = response.data.results.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      backdrop_path: movie.backdrop_path,
      poster_path: movie.poster_path,
      overview: movie.overview,
      release_date: movie.release_date,
      score: movie.vote_average,
      type: 'movie'
    };
  });

  dispatch({
    type: FETCH_NOW_PLAYING_MOVIE,
    payload: nowPlayingMovie
  });
};

export const fetchTvDetails = (id, page = 1) => async (dispatch) => {
  const repsonseTvDetails = await url(`/tv/${id}`, page);

  const videoDetails = await url(`/tv/${id}/videos`);

  const {
    name,
    backdrop_path,
    poster_path,
    overview,
    first_air_date,
    vote_average,
    genres,
    episode_run_time
  } = repsonseTvDetails.data;

  const tvDetails = {
    id,
    title: name,
    backdrop_path,
    poster_path,
    overview,
    release_date: first_air_date,
    score: vote_average,
    genres,
    runtime: episode_run_time,
    type: 'tv'
    // youtube_key: videoDetails.results[0].key
  };

  dispatch({
    type: FETCH_TV_DETAILS,
    payload: tvDetails
  });
};

export const fetchPopularTV = (page = 1) => async (dispatch) => {
  const response = await url(`/tv/popular`, page);

  const popularTV = response.data.results.map((tv) => {
    return {
      id: tv.id,
      title: tv.name,
      backdrop_path: tv.backdrop_path,
      poster_path: tv.poster_path,
      overview: tv.overview,
      release_date: tv.first_air_date,
      score: tv.vote_average,
      type: 'tv'
    };
  });

  dispatch({
    type: FETCH_POPULAR_TV,
    payload: popularTV
  });
};

export const fetchTrendingTV = (page = 1) => async (dispatch) => {
  const response = await url(`/trending/tv/day`, page);

  const trendingTV = response.data.results.map((tv) => {
    return {
      id: tv.id,
      title: tv.name,
      backdrop_path: tv.backdrop_path,
      poster_path: tv.poster_path,
      overview: tv.overview,
      release_date: tv.first_air_date,
      score: tv.vote_average,
      type: 'tv'
    };
  });

  dispatch({
    type: FETCH_TRENDING_TV,
    payload: trendingTV
  });
};
export const fetchAiringTodayTV = (page = 1) => async (dispatch) => {
  const response = await url(`/tv/airing_today`, page);

  const airingTV = response.data.results.map((tv) => {
    return {
      id: tv.id,
      title: tv.name,
      backdrop_path: tv.backdrop_path,
      poster_path: tv.poster_path,
      overview: tv.overview,
      release_date: tv.first_air_date,
      score: tv.vote_average,
      type: 'tv'
    };
  });

  dispatch({
    type: FETCH_AIRING_TODAY__TV,
    payload: airingTV
  });
};

export const fetchOnAirTV = (page = 1) => async (dispatch) => {
  const response = await url(`/tv/on_the_air`, page);

  const onAirTV = response.data.results.map((tv) => {
    return {
      id: tv.id,
      title: tv.name,
      backdrop_path: tv.backdrop_path,
      poster_path: tv.poster_path,
      overview: tv.overview,
      release_date: tv.first_air_date,
      score: tv.vote_average,
      type: 'tv'
    };
  });

  dispatch({
    type: FETCH_ON_THE_AIR__TV,
    payload: onAirTV
  });
};

export const fetchTopRatedTV = (page = 1) => async (dispatch) => {
  const response = await url(`/tv/top_rated`, page);

  const topRatedTV = response.data.results.map((tv) => {
    return {
      id: tv.id,
      title: tv.name,
      backdrop_path: tv.backdrop_path,
      poster_path: tv.poster_path,
      overview: tv.overview,
      release_date: tv.first_air_date,
      score: tv.vote_average,
      type: 'tv'
    };
  });

  dispatch({
    type: FETCH_TOP_RATED_TV,
    payload: topRatedTV
  });
};
