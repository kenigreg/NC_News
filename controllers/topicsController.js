const { fetchTopics, insertTopic } = require('../models/topicsModel');

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then(topics => {
      return res.status(200).send({ topics });
    })
    .catch(next);
};

exports.postTopics = (req, res, next) => {
  const { slug, description } = req.body;
  const keys = { slug, description };
  insertTopic(keys)
    .then(([topic]) => {
      if (Object.keys(req.body).length !== 2) {
        return Promise.reject({
          status: 400,
          msg: 'violates not null violation'
        });
      }
      res.status(201).send({ topic });
    })
    .catch(next);
};

//res.status(200).send({ topics });
