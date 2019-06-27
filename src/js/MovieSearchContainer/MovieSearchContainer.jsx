import React from 'react';
import { Link } from 'react-router-dom';
import { setSearch, getMovies } from './movieSearchActions';

class MovieSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleEnter(event) {
    if (event.keyCode === 13 || event.which === 13) {
      this.handleSearch();
    }
  }

  handleChange(event) {
    const value = event.target.value;
    const { dispatch } = this.props;
    dispatch(setSearch(value));
  }

  handleSearch() {
    const { dispatch, searchStr } = this.props;
    dispatch(getMovies(searchStr));
  }

  render() {
    console.log('in MovieSearchContainer');
    return (
      <div className='container'>
        <h1 className='text-center my-5'>Movie Finder</h1>
        <div className='input-group mb-5'>
          <input
            type='text' className='form-control' placeholder='Movie Title'
            onChange={ this.handleChange } onKeyPress={ this.handleEnter }
          />
          <div className='input-group-append'>
            <button className='btn btn-secondary' type='submit' onClick={ this.handleSearch }>Go!</button>
          </div>
        </div>

        { this.props.movies && this.props.movies.map(movie => (
          <div className='card border border-dark p-3 mb-2' key={ movie.imdbID }>
            <div className='card-body'>
              <div className='row mb-2'>
                <div className='col-3'>
                  { movie.Poster !== 'N/A' && (<img src={ movie.Poster } alt={ `${movie.Poster} Poster` } className='border border-dark img-fluid' />) }
                </div>
                <div className='col-9'>
                  <h3>{ movie.Title }</h3>
                  <h6>{ movie.Year }</h6>
                  <hr />
                  <p>{ movie.Plot }</p>
                  <Link to={ `/movie/${movie.imdbID}` } className='btn btn-primary float-right'>More Information</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className='text-danger'>{ this.props.error }</div>
      </div>
    );
  }
}

export default MovieSearchContainer;
