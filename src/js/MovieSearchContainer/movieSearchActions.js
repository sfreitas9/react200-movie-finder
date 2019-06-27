import axios from 'axios';

export const getMovies = (movie) => {
  return {
    type: 'GET_MOVIES',
    payload: axios.get(`/movies/${movie}`)
  };
};

export function setSearch(movie) {
  return {
    type: 'SET_SEARCH',
    payload: movie
  };
}
