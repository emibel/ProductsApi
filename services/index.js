const jwt = require('jwt-simple');
const moment = require('moment');
const bcrypt = require('bcrypt');
const config = require('../config');

const createToken = user => {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix(),
  };

  return jwt.encode(payload, config.SECRET_TOKEN);
}

const decodeToken = token => {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN);

      if (payload.exp <= moment.unix()) {
        reject({
          status: 401,
          message: 'Token expirated'
        });
      }

      resolve(payload.sub);

    } catch (err) {
      reject({
        status: 500,
        message: 'Invalid Token'
      })
    }
  });

  return decoded;
}

const cryptPassword = password => {
  return bcrypt.hash(password, config.SALT_ROUNDS);
}

const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

module.exports = {
  createToken,
  decodeToken,
  cryptPassword,
  comparePassword,
};
