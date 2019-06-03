const connection = require('../db/connection');

exports.fetchUserName = username => {
  return connection
    .select('username', 'avatar_url', 'name')
    .from('users')
    .where('users.username', '=', username);
};

exports.fetchUsers = () => {
  return connection.table('users').select('*');
};
