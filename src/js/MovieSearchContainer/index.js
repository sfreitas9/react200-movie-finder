import { connect } from 'react-redux';
import MovieSearchContainer from './MovieSearchContainer';

function mapStoreToProps(store) {
  return {
    movies: store.get.movies,
    searchStr: store.get.searchStr,
    error: store.get.error
  };
}

export default connect(mapStoreToProps)(MovieSearchContainer);
