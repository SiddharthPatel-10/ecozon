const express = require('express');
const router = express.Router();
const Product = require("../models/Product");
const {createProduct, getAllProducts, deleteProductById, getProductById, updateProductById, searchProducts, filterProducts} = require("../controllers/ProductController");

router.post('/createProduct', createProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/getProduct/:id', getProductById);
router.put('/updateProduct/:id', updateProductById);
router.delete('/deleteProduct/:id', deleteProductById);
router.get('/search', searchProducts);
router.get('/filter', filterProducts);


module.exports = router;
