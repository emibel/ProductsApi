const ObjectId = require('mongodb').ObjectId

const User = require('./../models/user');
const service = require('../services');
const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport("smtps://sendEmailProducts%40gmail.com:"+encodeURIComponent('MyPassword!') + "@smtp.gmail.com:465");

exports.signUp = (req, res) => {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password,
  });

  user.save( err => {
    if (err) {
      return res.status(500).send({messgae: err});
    };

    return res.status(201).send( {token: service.createToken(user)} );
  })
}

exports.signIn = (req, res) => {
  User.findOne({ email: req.body.email, active: true}, 'email displayName password',  (err, user) => {

    if(err) return res.status(500).send({ messgae: err });
    if(!user) return res.status(401).send({ message: 'Email or password don\'t match' });
    if(!service.comparePassword(req.body.password, user.password)) {
      return res.status(401).send({ message: 'Email or password don\'t match' });
    }

    req.user = user;

    res.status(200).send({
      message: 'Login success',
      token: service.createToken(user),
      email: user.email,
      displayName: user.displayName,
      photo: user.gravatar(),
    })
  })
}

exports.verify = (req, res) => {

  User.findOneAndUpdate({_id: ObjectId(req.user_id), active: false}, { active: true }, 'email displayName password active',  (err, user) => {

    if(err) return res.status(500).send({ messgae: err });

    if(!user) return res.status(401).send({ message: 'Invalid Token' });

    mailOptions={
      to : user.email,
      subject : "Your account is now ACTIVE",
      html : "Hello,<br> You have activated your account.<br>",
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
      if(error){
        console.log(error);
      }else{
        res.status(200).send({response});
      }
    });
  })

}
