const {
  fetchUserName,
  fetchUsers,
  insertUser
} = require('../models/usersModel');

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

exports.postUsers = (req, res, next) => {
  const { username, name, avatar_url } = req.body;
  const keys = { username, name, avatar_url };
  insertUser(keys)
    .then(([user]) => {
      if (Object.keys(req.body).length !== 3) {
        return Promise.reject({
          status: 400,
          msg: 'violates not null violation'
        });
      }
      res.status(201).send({ user });
    })
    .catch(next);
};
