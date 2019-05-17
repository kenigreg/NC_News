process.env.NODE_ENV = 'test';
const chai = require('chai');
const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

chai.use(require('chai-sorted'));

describe('/', () => {
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
            votes: 100,
            created_at: '2018-11-15T12:21:54.171+00:00',
            comment_count: '13'
          });
          expect(body.articles[0]).to.contain.keys(
            'author',
            'title',
            'article_id',
            'topic',
            'created_at',
            'votes',
            'comment_count'
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
            comment_count: '13',
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
          expect(body.articles[0]).to.eql({
            article_id: 1,
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            comment_count: '13',
            created_at: '2018-11-15T12:21:54.171+00:00',
            votes: 100
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
            comment_count: '2',
            created_at: '2002-11-19T12:21:54.171+00:00',
            votes: 0
          });
        });
    });
  });

  describe('/articles/:article_id', () => {
    it('GET returns status:200 and articles objects containing an array of an article by the passed article_id', () => {
      return request(app)
        .get('/api/articles/3')
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.be.an('object');
          expect(body.article).to.eql({
            article_id: 3,
            title: 'Eight pug gifs that remind me of mitch',
            topic: 'mitch',
            author: 'icellusedkars',
            body: 'some gifs',
            created_at: '2010-11-17T12:21:54.171+00:00',
            votes: 0,
            comment_count: '0'
          });
        });
    });
    it('PATCH returns status 200 and the object which was updated', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ inc_votes: 10 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.eql({
            article_id: 1,
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: '2018-11-15T12:21:54.171+00:00',
            votes: 110
          });
        });
    });

    it('GET status:404 responds with error message when request is made with an article_id that does not exist', () => {
      return request(app)
        .get('/api/articles/99999999')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal('Article_Id Not Found');
        });
    });
  });

  describe('/articles/:article_id/comments', () => {
    it('GET returns status:200 and articles objects containing an array of an article comments by the passed article_id', () => {
      return request(app)
        .get('/api/articles/5/comments')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0]).to.include.all.keys(
            'comment_id',
            'author',
            'created_at',
            'body',
            'votes'
          );

          expect(body.comments).to.eql([
            {
              comment_id: 14,
              body:
                'What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.',
              author: 'icellusedkars',
              votes: 16,
              created_at: '2004-11-25T12:36:03.389+00:00'
            },
            {
              comment_id: 15,
              body: "I am 100% sure that we're not completely sure.",
              author: 'butter_bridge',
              votes: 1,
              created_at: '2003-11-26T12:36:03.389+00:00'
            }
          ]);
        });
    });
  });

  describe('/articles/:article_id/comments', () => {
    it('POST returns status:201 and posted comments objects containing comment posted by the passed article_id', () => {
      return request(app)
        .post('/api/articles/2/comments')
        .send({
          username: 'lurker',
          body:
            'I am safe, whatever may betide me; I am safe who ever may deride me; I am safe, as long as I confide me In the hollow of God’s hand.'
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment[0]).to.have.keys(
            'comment_id',
            'author',
            'article_id',
            'votes',
            'created_at',
            'body'
          );
        });
    });
  });

  describe('/comments/:comment_id', () => {
    it('PATCH returns status 200 and the object which was updated', () => {
      return request(app)
        .patch('/api/comments/1')
        .send({ inc_votes: 24 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).to.eql({
            comment_id: 1,
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
            article_id: 9,
            author: 'butter_bridge',
            votes: 40,
            created_at: '2017-11-22T12:36:03.389+00:00'
          });
        });
    });

    it('PATCH status:400 responds with error message when request is made with a bad/invalid comment_id', () => {
      return request(app)
        .patch('/api/comments/abc')
        .send({ inc_votes: 24 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Bad Request, incorrect form for id!');
        });
    });

    it('DELETE returns status 204 and the object which was deleted', () => {
      return request(app)
        .delete('/api/comments/2')
        .expect(204)
        .then(({ body }) => {
          expect(body).to.eql({});
        });
    });
  });

  describe('/users/:username', () => {
    it('GET returns status:200 and user object containing an array of user by passed username', () => {
      return request(app)
        .get('/api/users/rogersop')
        .expect(200)
        .then(({ body }) => {
          expect(body.user).to.be.an('array');
          expect(body.user[0]).to.eql({
            username: 'rogersop',
            avatar_url:
              'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4',
            name: 'paul'
          });
        });
    });
  });
});
