const articlesRouter = require('express').Router();
const {
  getArticles,
  getArticlesById,
  updateVotesByArticleId
} = require('../controllers/articlesController');

articlesRouter.route('/').get(getArticles);

articlesRouter
  .route('/:article_id')
  .get(getArticlesById)
  .patch(updateVotesByArticleId);

module.exports = articlesRouter;
