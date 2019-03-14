const express = require("express");
const UserRoute = express.Router();

const Cors = require('cors');
const CorsOptions = require('../corsOptions');

const UserCtrl = require('./../controllers/user');
const verify = require('../middlewares/verify.js');

UserRoute.route('/signUp')
  .post(UserCtrl.signUp, Cors(CorsOptions));

UserRoute.route('/signIn')
  .post(UserCtrl.signIn, Cors(CorsOptions));

UserRoute.route('/verify')
    .get(verify, UserCtrl.verify, Cors(CorsOptions));

module.exports = UserRoute;
