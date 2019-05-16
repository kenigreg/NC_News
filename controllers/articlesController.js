const {
  fetchArticles,
  fetchArticlesById,
  changeVotesByArticleId
} = require('../models/articlesModel');

exports.getArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  fetchArticles(sort_by, order, author, topic)
    .then(articles => res.status(200).send({ articles }))
    .catch(next);
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  const { comments } = req.query;

  fetchArticlesById(article_id, comments)
    .then(([article]) => res.status(200).send({ article }))
    .catch(next);
};

exports.updateVotesByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { body } = req;

  changeVotesByArticleId(article_id, body)
    .then(([article]) => {
      res.send({ article });
    })
    .catch(next);
};
