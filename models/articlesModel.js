const connection = require('../db/connection');

exports.fetchArticles = (sort_by, order, author, topic) => {
  return connection
    .table('articles')
    .select('*')
    .orderBy(sort_by || 'article_id')
    .modify(query => {
      if (order) query.orderBy('article_id', order);
    });
};
