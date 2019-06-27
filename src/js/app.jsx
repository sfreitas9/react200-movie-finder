import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import MovieDetailContainer from './MovieDetailContainer';
import MovieSearchContainer from './MovieSearchContainer';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Route exact path='/' component={ MovieSearchContainer } />
          <Route path='/movie/:id' component={ MovieDetailContainer } />
        </div>
      </Router>
    );
  }
}
