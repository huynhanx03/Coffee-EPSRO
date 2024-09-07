const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/:userId/:productId', reviewController.setReview)
router.get('/:productId', reviewController.getReview)

module.exports = router;