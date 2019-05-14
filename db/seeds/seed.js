const {
  articlesData,
  commentsData,
  topicsData,
  usersData
} = require('../data');
const { getCurrentDate, renameKeys, createRef } = require('../../utils/util');

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      // insert data
      return knex('topics')
        .insert(topicsData)
        .returning('*');
    })
    .then(() => {
      return knex('users')
        .insert(usersData)
        .returning('*');
    })
    .then(articleRows => {
      const updatedArticles = getCurrentDate(articlesData, articleRows);
      return knex('articles')
        .insert(updatedArticles)
        .returning('*');
    })
    .then(commentRows => {
      const updatedComments = renameKeys(commentsData, commentRows);
      console.log(updatedComments, '<---');
      const newComments = getCurrentDate(updatedComments, commentRows);
      console.log(newComments, '<---');
      return knex('comments')
        .insert(newComments)
        .returning('*');
    });
};
