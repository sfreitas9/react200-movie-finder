import React from 'react';
import { Link } from 'react-router-dom';

class MovieDetailContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const movie = this.props.location.state.movie;  // this.props.movies.find(m => m.imdbID === match.params.id);
    return (
      <div className=''>
        <h1 className='text-center my-5'>Movie Results</h1>
        {/* <p><a href={ this.props.history.goBack() }>Go Back</a></p> */}
        <Link to='/'>Go Back</Link>
        <div className='card p-3 my-2 border border-dark'>
          <div className='card-body'>
            <div className='row'>
              <div className='col-3'>
                { movie.Poster !== 'N/A' && (<img src={ movie.Poster } alt={ `${movie.Title} Poster` } className='border border-dark img-fluid' />) }
              </div>
              <div className='col-9'>
                <div className='card'>
                  <div className='card-heading bg-primary text-white p-2 '>
                    Movie Details
                  </div>
                  <div className='card-body'>
                    {/* <p>Viewing movie { movie.imdbID }</p> */}
                    <h3 className='text-bold'>{ movie.Title }</h3>
                    <p style={ { lineHeight: '2em' } }>
                      <span className='bg-success text-white rounded py-1 px-2'>{ movie.Year }</span>
                      <span className='bg-success text-white rounded py-1 px-2 mx-2'>{ movie.Runtime }</span>
                      <span className='bg-success text-white rounded py-1 px-2'>{ movie.Genre }</span>
                    </p>
                    <p>{ movie.Plot }</p>
                    <p>{ movie.Awards }</p>
                    <p><span className='font-weight-bold'>Metascore:</span> { movie.Metascore }</p>
                    <p><span className='font-weight-bold'>IMDB:</span> { movie.imdbRating }/10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetailContainer;
