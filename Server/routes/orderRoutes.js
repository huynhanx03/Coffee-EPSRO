const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/:userId', orderController.getOrders)
router.put('/:orderId', orderController.setStatusOrder)

module.exports = router