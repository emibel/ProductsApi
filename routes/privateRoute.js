const express = require("express");
const PrivateRoute = express.Router();
const Cors = require('cors');
const CorsOptions = require('../corsOptions');
const auth = require('../middlewares/auth');

PrivateRoute.route('/private')
  .get(auth, (req, res) => {
    res.status(200).send({ message: 'access granted' });
  }, Cors(CorsOptions))

module.exports = PrivateRoute;
