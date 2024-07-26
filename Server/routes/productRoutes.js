const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/categories', productController.getCategories);
router.get('/products', productController.getProducts);
router.get('/products/:productId', productController.getProductById);
router.get('/sales', productController.getProductsSale);
router.get('/bestseller', productController.getProductsBestSeller);
router.get('/discounts', productController.getDiscountProductsHandler);
router.put('/discounts/:productID', productController.updateDiscountFromProductHandler);

module.exports = router;