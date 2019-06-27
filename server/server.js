/* eslint no-console: "off" */
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
        const allMovies = moviesResponse.data.Search.map((currMovie) => {
          return axios.get(`http://www.omdbapi.com/?i=${currMovie.imdbID}&apikey=8730e0e`);
        });
        Promise.all(allMovies)
          .then((movies) => {
            const newSearchResults = movies.map(m => m.data);
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

module.exports = app;
