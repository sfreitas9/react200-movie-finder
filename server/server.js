const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));

const movieCache = {};

app.get('/movies/:str', (req, res) => {
  const searchStr = req.params.str;
  if (!(searchStr in movieCache)) {
    axios
      .get(`http://www.omdbapi.com/?s=${searchStr}&apikey=8730e0e&type=movie`)
      .then((moviesResponse) => {
        if (moviesResponse.data.Response === 'False') {
          res.status(204).send('no movies found');
        }
        console.log(`moviesResponse is ${moviesResponse}`);
        const allMovies = moviesResponse.data.Search.map((currMovie) => {
          console.log( `about to axios.get for ${currMovie.imdbID}`);
          return axios.get(`http://www.omdbapi.com/?i=${currMovie.imdbID}&apikey=8730e0e`);
        });
        console.log(`all movies is ${allMovies}`);
        Promise.all(allMovies)
          .then((movies) => {
            console.log(`movies is ${movies}`);
            const newSearchResults = movies.map(m => m.data);
            console.log(`new search results ${newSearchResults}`);
            movieCache[searchStr] = newSearchResults;
            res.status(200).send(newSearchResults);
          })
          .catch(err => console.log(err.message));
      })
      .catch(err => console.log(err));
  } else {
    res.status(200).send(movieCache[searchStr]);
  }
});


//             });
//         });
//         console.log(response.data);
//         res.status(200).json(response.data);
//       })
//       .catch((error) => {
//         res.status(404).send(`Movies not found: ${error}`);
//       });
// });

// app.get('/movie/:id', (req, res) => {
//   const url = `http://www.omdbapi.com/?i=${req.params.id}&apikey=8730e0e`;
//   console.log(`url is ${url}`);
//   axios
//       .get(url)
//       .then((response) => {
//         console.log(response.data);
//         res.status(200).json(response.data);
//       })
//       .catch((error) => {
//         res.status(404).send(`Movie not found: ${error}`);
//       });
// });

module.exports = app;
