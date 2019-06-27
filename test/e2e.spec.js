/* global define, it, describe, beforeEach, document */
import { getMovies, setSearch } from '../src/js/MovieSearchContainer/movieSearchActions';

const express = require('express');
const path = require('path');
const Nightmare = require('nightmare');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const axios = require('axios');

const app = express();
app.use(express.static(path.join(__dirname, '/../public')));
app.use(express.static(path.join(__dirname, '/../dist')));

// app.listen(8888);

const url = 'http://localhost:8888';
// const urlDetail = 'http://localhost:8888/movie/tt0111161';
chai.use(chaiHttp);

let nightmare = new Nightmare();

describe('Verify App', function() {
  this.timeout(12000);

  let pageObject = null;
  let httpServer = null;

  before((done) => {
    httpServer = app.listen(8888);
    done();
  });

  beforeEach(() => {
    // nightmare = new Nightmare();
    pageObject = nightmare.goto(url);
  });

  after((done) => {
    httpServer.close();
    done();
  });

  it('should have the correct page title for main page', () => {
    return pageObject
      .evaluate(() => document.querySelector('body').innerText)
      .then((text) => {
        expect(text).to.contain('Movie Finder');
      });
  });

  it('returns the correct status code on search page', () =>
    axios.get(url)
      .then(response => expect(response.status === 200)));

  // it('should display an input field for searching', () =>
  //   nightmare
  //     .goto(url)
  //     .evaluate(() => document.querySelector('input[id=searchText]').innerText)
  //     .end()
  //     .then(output => {
  //       expect(output).to.exist;
  //     })
  //   );

  // it('should display an button for searching', () =>
  //   nightmare
  //     .goto(url)
  //     .evaluate(() => document.querySelector('#searchBtn').innerText)
  //     .end()
  //     .then(output => {
  //       expect(output).to.exist;
  //     })
  // );

  it('should get an object when good search term is used', (done) => {
    chai.request(app)
      .get('/movies/fun')
      .end((err, res) => {
        expect(typeof res).to.equal('object');
        expect(err).to.be.null;
        done();
      });
  });

  it('should get an object for Detail page', (done) => {
    chai.request(app)
      .get('/movie/tt0111161')
      .end((err, res) => {
        expect(typeof res).to.equal('object');
        expect(err).to.be.null;
        done();
      });
  });

  // it('should give an error message when search term does not find anything', () =>
  //   nightmare
  //     .goto(url)
  //     .type('#searchText', 'sdafsd')
  //     .click('#searchBtn')
  //     .wait(3000)
  //     .evaluate(() => document.querySelector('#error').innerText)
  //     .end()
  //     .then((output) => {
  //       expect(output).to.exist;
  //       expect(output).to.not.be.null;
  //       expect(typeof output).to.equal('string');
  //       expect(output).to.equal('There was a problem with your request');
  //     })
  //   );
});

describe('Verify actions', () => {
  it('should return an object for setSearch', (done) => {
    const search = setSearch('Terminator');
    expect(search).to.be.a('object');
    done();
  });

  it('should return an object for getMovies', (done) => {
    const search = getMovies('Terminator');
    expect(search).to.be.a('object');
    done();
  });
});
