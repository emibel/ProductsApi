var express = require("express");
var ProductRoute = express.Router();
var ProductCtrl = require('./../controllers/product');
var Cors = require('cors');
var CorsOptions = require('./../corsOptions');

const auth = require('../middlewares/auth');

ProductRoute.route('/products')
  .get(auth, ProductCtrl.findAllProducts, Cors(CorsOptions))
  .post(auth, ProductCtrl.addProduct, Cors(CorsOptions));

ProductRoute.route('/products/:id')
  .get(auth, ProductCtrl.findById, Cors(CorsOptions))
  .put(auth, ProductCtrl.updateProduct, Cors(CorsOptions))
  .delete(auth, ProductCtrl.deleteProduct, Cors(CorsOptions));

module.exports = ProductRoute;
