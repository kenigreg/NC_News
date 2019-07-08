# NC News

## Getting Started

To run the project on your local machine, you can clone this repo containing the project using the following link: https://github.com/kenigreg/NC_News;<br>

You will need to have [Node.js](https://nodejs.org/en/download/) installed as well.

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

## Available endpoints

GET /api/topics
POST /api/topics

GET /api/articles
POST /api/articles

GET /api/articles/:article_id
PATCH /api/articles/:article_id
DELTE /api/articles/:article_id

GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id

GET /api/users
POST /api/users

GET /api/users/:username
