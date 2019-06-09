const connection = require('../db/connection');

exports.fetchArticles = (sort_by, order, author, topic, p, limit) => {
  return connection
    .table('articles')
    .select(
      'articles.author',
      'articles.title',
      'articles.article_id',
      'articles.topic',
      'articles.created_at',
      'articles.votes'
    )
    .countDistinct('articles.article_id as total_count')
    .limit(limit || 10)
    .offset(limit * (p - 1))
    .orderBy(sort_by || 'created_at', order || 'desc')
    .modify(query => {
      if (author) query.where('articles.author', '=', author);
      if (topic) query.where('topic', '=', topic);
    })

    .count('comments.article_id as comment_count')
    .groupBy('articles.article_id')
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id');
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

exports.changeVotesByArticleId = (article_id, { inc_votes }) => {
  return connection('articles')
    .where('article_id', '=', article_id)
    .increment('votes', inc_votes || 0)
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

    .where('comments.article_id', '=', article_id)
    .leftJoin('articles', 'comments.article_id', '=', 'articles.article_id');
};

exports.insertCommentsByArticleId = keys => {
  return connection('comments')
    .insert(keys)
    .returning('*');
};

exports.insertArticle = keys => {
  return connection('articles')
    .insert(keys)
    .returning('*');
};
