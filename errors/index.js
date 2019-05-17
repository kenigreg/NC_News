exports.routeNotFound = (req, res) => {
  //console.log(err);
  res.status(404).send({ msg: err.msg || 'Route Not Found' });
};

exports.methodNotAllowed = (err, req, res, next) => {
  //console.log(err);
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handle400 = (err, req, res, next) => {
  //console.log(err);
  const codes = {
    '23502': 'violates not null violation',
    '22P02': 'Bad Request, incorrect form for id!'
  };
  if (codes[err.code]) res.status(400).send({ msg: codes[err.code] });
  else next(err);
};

exports.handle404 = (err, req, res, next) => {
  //console.log(err);
  res.status(404).send({ msg: err.msg });
};

exports.handle500 = (err, req, res, next) => {
  //console.log(err);
  res.status(500).send({ msg: 'Internal Server Error' });
};
