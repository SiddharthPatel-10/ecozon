const express = require('express');
const router = express.Router();
const {createProduct, getAllProducts, deleteProductById, getProductById, updateProductById} = require("../controllers/ProductController");

router.post('/createProduct', createProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/getProduct/:id', getProductById);
router.put('/updateProduct/:id', updateProductById);
router.delete('/deleteProduct/:id', deleteProductById);

module.exports = router;
