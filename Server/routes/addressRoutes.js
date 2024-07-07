const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

router.post('/:userId', addressController.addAddress);
router.get('/:userId', addressController.getAddress);
router.put('/:userId/:MaDC', addressController.setDefaultAddress);

module.exports = router;