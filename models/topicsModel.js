const connection = require('../db/connection');

exports.fetchTopics = () => {
  return connection.table('topics').select('*');
};
