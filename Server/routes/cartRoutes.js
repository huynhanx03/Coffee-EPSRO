const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/:userId', cartController.setCart)
router.delete('/:userId/:MaSanPham', cartController.deleteItemCart)
router.delete('/:userId', cartController.removeCart)
router.get('/:userId', cartController.getCart)
router.put('/:userId', cartController.updateCartWithLastPrice)

module.exports = router;