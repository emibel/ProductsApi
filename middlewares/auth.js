const ObjectId = require('mongodb').ObjectId;
const User = require('./../models/user');
const services = require('../services');

isAuth = (req, res, next) => {
  if(!req.headers.authorization) {
    res.status(401).send({ message: 'Permission denied'});
  }

  const token = req.headers.authorization.split(' ')[1];

  services.decodeToken(token)
  .then(user_id => {
    User.findOne({ _id: ObjectId(user_id), active: true }, 'email',  (err, user) => {
      if(err) return res.status(500).send({ messgae: err });

      if(!user) return res.status(401).send({ message: 'Email or password don\'t match' });

      req.user = user;

      next();
    })
  })
  .catch(response => {
    res.status(500).send(response.message);
  })
}

module.exports = isAuth;
