const express = require('express');
const router = express.Router();
const productController = require('../controllers/Mobile/productController');

router.get('/categories', productController.getCategories);
router.get('/products', productController.getProducts);
router.get('/products/:productId', productController.getProductById);
router.get('/sales', productController.getProductsSale);
router.get('/bestseller', productController.getProductsBestSeller);

module.exports = router;