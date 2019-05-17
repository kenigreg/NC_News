const {
  articlesData,
  commentsData,
  topicsData,
  usersData
} = require('../data');
const {
  getCurrentDate,
  formatComments,
  createRef
} = require('../../utils/util');

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex('topics')
        .insert(topicsData)
        .returning('*');
    })
    .then(() => {
      return knex('users')
        .insert(usersData)
        .returning('*');
    })
    .then(userRows => {
      const updatedArticles = getCurrentDate(articlesData, userRows);
      return knex('articles')
        .insert(updatedArticles)
        .returning('*');
    })
    .then(articleRows => {
      const refObject = createRef(articleRows);
      const formatedComments = formatComments(commentsData, refObject);
      return knex('comments')
        .insert(formatedComments)
        .returning('*');
    });
};
