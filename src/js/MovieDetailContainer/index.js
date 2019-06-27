import { connect } from 'react-redux';
import MovieDetailContainer from './MovieDetailContainer';

function mapStoreToProps(store) {
  return {
    movies: store.get.movies
  };
}

export default connect(mapStoreToProps)(MovieDetailContainer);
