const express = require("express");
const bodyParser  = require("body-parser");

const app = express();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const allowCrossDomain = require('./middlewares/allowCrossDomain.js');

//------------------------------------------------------------------------
// API routes
//------------------------------------------------------------------------
const productRoute = require('./routes/productRoute.js');
const privateRoute = require('./routes/privateRoute.js');
const userRoute = require('./routes/userRoute.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(allowCrossDomain);

app.use('/api/', productRoute);
app.use('/api/', privateRoute);
app.use('/api/', userRoute);

//------------------------------------------------------------------------

mongoose.connect('mongodb://127.0.0.1/shop', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(8100, function() {
    console.log("Node server running on http://localhost:8100");
  });
});
