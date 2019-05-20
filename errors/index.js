exports.routeNotFound = (req, res, next) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res, next) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handle400 = (err, req, res, next) => {
  const codes = {
    '23502': 'violates not null violation',
    '22P02': 'Bad Request, incorrect form for id!',
    '42703': 'Column does Not Exist'
  };

  if (codes[err.code]) res.status(400).send({ msg: codes[err.code] });
  else next(err);
};

exports.handle404 = (err, req, res, next) => {
  res.status(404).send({ msg: err.msg });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};
