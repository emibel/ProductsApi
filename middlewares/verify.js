const services = require('../services');

const verify = (req, res, next) => {
  const token = req.query && req.query.token;

  if(!token) {
    res.status(401).send({ message: 'Permission denied'});
  }

  services.decodeToken(token)
  .then(response => {
    req.user_id = response;
    next();
  })
  .catch(response => {
    res.status(response.status).send(response.message);
  })
}

module.exports = verify;
