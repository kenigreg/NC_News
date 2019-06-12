const connection = require('../db/connection');

exports.fetchTopics = () => {
  return connection.table('topics').select('*');
};

exports.insertTopic = keys => {
  return connection('topics')
    .insert(keys)
    .returning('*');
};
