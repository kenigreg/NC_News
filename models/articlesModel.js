const connection = require('../db/connection');

exports.fetchArticles = (sort_by, order, author, topic) => {
  return connection
    .table('articles')
    .select('*')
    .orderBy(sort_by || 'created_at', order || 'desc')
    .modify(query => {
      if (author) query.where('author', '=', author);
      if (topic) query.where('topic', '=', topic);
    });
};
