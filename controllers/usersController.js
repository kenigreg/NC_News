const { fetchUserName, fetchUsers } = require('../models/usersModel');

exports.getUserName = (req, res, next) => {
  const { username } = req.params;

  fetchUserName(username)
    .then(([user]) => {
      if (!user) {
        return Promise.reject({ status: 404, msg: 'Route Not Found' });
      } else res.status(200).send({ user });
    })
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then(users => res.status(200).send({ users }))
    .catch(next);
};
