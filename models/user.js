const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const service = require('../services');

const smtpTransport = nodemailer.createTransport("smtps://sendEmailProducts%40gmail.com:"+encodeURIComponent('MyPassword!') + "@smtp.gmail.com:465");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email:  { type: String, unique: true, lowercase: true },
  displayName:  String,
  avatar:  String,
  password: { type: String, select: false },
  signUpDate: { type: Date, default: Date.now() },
  lastLogin: Date,
  active: { type: Boolean, default: false },
});

// User model Middlawares;
userSchema.pre('save', function(next) {

  let user = this;

  if (!user.isModified('password')) {
    next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if(err) return next(err);

      user.password = hash;

      console.log('password saved');
      next();
    })
  })
});

userSchema.post('save', user => {

  const link="http://localhost:8100/api/verify?token="+service.createToken(user);

  mailOptions={
      to : user.email,
      subject : "Please confirm your Email account",
      html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
  }
  smtpTransport.sendMail(mailOptions, (error, response) => {
    if(error){
      console.log(error);
    }else{
      console.log("Message sent: ", response.message);
    }
  });
});

userSchema.methods.gravatar = function() {
  if (!this.email ) return 'https://gravatar.com/avatar/?s.2006d=retro';

  const md5 = crypto.createHash('md5').update(this.email).digest('hex');

  return `https://gravatar.com/avatar/${md5}?s.2006d=retro`;
}

module.exports = mongoose.model('User', userSchema);
