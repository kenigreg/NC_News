const { fetchArticles } = require('../models/articlesModel');

exports.getArticles = (req, res, next) => {
  const { sort_by, order, author, topic } = req.query;
  fetchArticles(sort_by, order, author, topic)
    .then(articles => res.status(200).send({ articles }))
    .catch(next);
};
