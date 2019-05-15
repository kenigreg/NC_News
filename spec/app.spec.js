process.env.NODE_ENV = 'test';
const chai = require('chai');
const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

chai.use(require('chai-sorted'));

describe.only('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe('/topics', () => {
    it('GET returns status:200 and topic objects containing an array of topics', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).to.have.length(3);
          expect(body.topics).to.be.an('array');
          expect(body.topics[0]).to.eql({
            description: 'The man, the Mitch, the legend',
            slug: 'mitch'
          });
          expect(body.topics[0]).to.contain.keys('slug', 'description');
        });
    });
  });
  describe('/articles', () => {
    it('GET returns status:200 and articles objects containing an array of articles', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.have.length(12);
          expect(body.articles).to.be.an('array');
          expect(body.articles[0]).to.eql({
            article_id: 1,
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: '2018-11-15T12:21:54.171+00:00',
            votes: 100
          });
          expect(body.articles[0]).to.contain.keys(
            'author',
            'title',
            'article_id',
            'topic',
            'created_at',
            'body',
            'votes'
          );
        });
    });
    it('GET returns status:200 and articles objects containing an array of articles sorted by the passed query', () => {
      return request(app)
        .get('/api/articles?sort_by=article_id&order=asc')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0]).to.eql({
            article_id: 1,
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: '2018-11-15T12:21:54.171+00:00',
            votes: 100
          });
        });
    });

    it('GET returns status:200 and articles objects containing an array of articles sorted by author passed as query', () => {
      return request(app)
        .get('/api/articles?author=butter_bridge')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[2]).to.eql({
            article_id: 12,
            title: 'Moustache',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'Have you seen the size of that thing?',
            created_at: '1974-11-26T12:21:54.171+00:00',
            votes: 0
          });
        });
    });
    it('GET returns status:200 and articles objects containing an array of articles sorted by topic passed as query', () => {
      return request(app)
        .get('/api/articles?topic=cats')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0]).to.eql({
            article_id: 5,
            title: 'UNCOVERED: catspiracy to bring down democracy',
            topic: 'cats',
            author: 'rogersop',
            body: 'Bastet walks amongst us, and the cats are taking arms!',
            created_at: '2002-11-19T12:21:54.171+00:00',
            votes: 0
          });
        });
    });
  });
});
