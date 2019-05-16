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

exports.fetchArticlesById = article_id => {
  return connection
    .select(
      'articles.article_id',
      'articles.author',
      'articles.body',
      'articles.created_at',
      'articles.title',
      'articles.topic',
      'articles.votes'
    )
    .from('articles')
    .count('comments.comment_id as comment_count')
    .groupBy('articles.article_id')
    .where('articles.article_id', '=', article_id)
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id');
};

exports.changeVotesByArticleId = (article_id, newVote) => {
  return connection('articles')
    .where('article_id', '=', article_id)
    .update(newVote)
    .returning('*');
};

exports.fetchCommentsByArticleId = (article_id, sort_by, order) => {
  return connection
    .select(
      'comments.comment_id',
      'comments.votes',
      'comments.created_at',
      'comments.author',
      'comments.body'
    )
    .orderBy(sort_by || 'created_at', order || 'desc')
    .from('comments')
    .groupBy('comments.comment_id')
    .where('comments.article_id', '=', article_id)
    .leftJoin('articles', 'comments.article_id', '=', 'articles.article_id');
};

exports.insertCommentsByArticleId = (article_id, comment) => {
  return connection('comments')
    .returning('body')
    .where('comments.article_id', '=', article_id)
    .insert(comment);
};
