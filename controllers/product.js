require('./../models/product');

const mongoose = require('mongoose');

const Product  = mongoose.model('Product');

//GET - Return all products in the DB
exports.findAllProducts = (req, res)  => {
    console.log('products list by ', req.user.email);
    Product.find((err, products) => {
        if(err) res.send(500, err.message);

        console.log('GET /products')
        res.status(200).jsonp(products);
    });
};

//GET - Return a Products with specified ID
exports.findById = (req, res) => {
    Product.findById(req.params.id, (err, products) => {
    if(err) return res.send(500, err.message);

    console.log('GET /products/' + req.params.id);
    res.status(200).jsonp(products);
    });
};

//PUT - Insert a new products in the DB
exports.addProduct = (req, res) => {
    const product = new Product({
        name:    req.body.name,
        price:   req.body.price,
        image:   req.body.image
    });

    product.save((err, product) => {
        if(err) return res.status(500).send(err.message);
        res.status(200).jsonp(product);
    });
};

//POST - Update a register already exists
exports.updateProduct = (req, res) => {
    Products.findById(req.params.id, (err, product) => {
        name  =     req.body.name,
        price =     req.body.price,
        image =     req.body.image

        product.save(err => {
            if(err) return res.status(500).send(err.message);
            res.status(200).jsonp(product);
        });
    });
};

//DELETE - Delete a Product with specified ID
exports.deleteProduct = (req, res) => {
    Products.findById(req.params.id, (err, product) => {
        product.remove(err => {
            if(err) return res.status(500).send(err.message);
            res.status(200).send();
        })
    });
};
