# NC News

## Getting Started

To run the project on your local machine, you can clone this repo containing the project using the following link: https://github.com/kenigreg/NC_News;<br>

You will need to have [Node.js](https://nodejs.org/en/download/) installed as well.

The project is hosted on heroku and the endpoints can be found here [https://gregs-ncnews.herokuapp.com/api](https://gregs-ncnews.herokuapp.com/api)

### Available Scripts

Create development and test databases locally:

```bash
npm run setup-dbs
```

Run tests:

```bash
npm test
```

Rollback, migrate -> latest, then start inserting data into the database:

```bash
npm run seed
```

Run the server with `nodemon`, for hot reload:

```bash
npm run dev
```

Run the server with `node`:

```bash
npm start
```

## Dependencies

Other dependencies that needs to be installed are [ExpressJs](https://expressjs.com/), [KnexJs](https://knexjs.org/), [Supertest](https://www.npmjs.com/package/supertest), [Chai](https://www.chaijs.com/), and [Mocha](https://mochajs.org/)

## Available endpoints

GET [/api/topics]
POST [/api/topics]

GET [/api/articles]
POST [/api/articles]

GET [/api/articles/:article_id]
PATCH [/api/articles/:article_id]
DELTE [/api/articles/:article_id]

GET [/api/articles/:article_id/comments]
POST [/api/articles/:article_id/comments]

PATCH [/api/comments/:comment_id]
DELETE [/api/comments/:comment_id]

GET [/api/users]
POST [/api/users]

GET [/api/users/:username]
