import React from 'react';

class MovieDetailContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(`inside render for MovieDetailContainer ${this.props.match.params.id}`);
    const movie = this.props.movies.find(m => m.imdbID === this.props.match.params.id);
    return (
      <div className=''>
        <h1>Hello!</h1>
        <p><a href={ this.props.history.goBack() }>Go Back</a></p>
        <div className='card p-3'>
          <div className='card-body'>
            <div className='row'>
              <div className='col-3'>
                <img src={ movie.Poster } alt={ `${movie.Title} Poster` } className='border border-dark' />
              </div>
              <div className='col-9'>
                <div className='card'>
                  <div className='card-heading bg-info p-2'>
                    Movie Details
                  </div>
                  <div className='card-body'>
                    {/* <p>Viewing movie { movie.imdbID }</p> */}
                    <h3 className='text-bold'>{ movie.Title }</h3>
                    <p>
                      <span className='bg-success text-white rounded py-1 px-2'>{ movie.Year }</span>
                      <span className='bg-success text-white rounded py-1 px-2 mx-2'>{ movie.Runtime }</span>
                      <span className='bg-success text-white rounded py-1 px-2'>{ movie.Genre }</span>
                    </p>
                    <p>{ movie.Plot }</p>
                    <p>{ movie.Awards }</p>
                    <p><span className='text-bold'>Metascore:</span> { movie.Metascore }</p>
                    <p><span className='text-bold'>IMDB:</span> { movie.imdbRating }/10</p>
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
