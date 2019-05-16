const { fetchUserName } = require('../models/usersModel');

exports.getUserName = (req, res, next) => {
  const { username } = req.params;

  fetchUserName(username)
    .then(user => res.status(200).send({ user }))
    .catch(next);
};
