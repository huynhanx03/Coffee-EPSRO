const express = require('express')
const router = express.Router()
const voucherController = require('../controllers/voucherController')

router.get('/:userId', voucherController.getVoucher)
router.post('/update/:voucherId/:userId', voucherController.updateVoucherUsed)

module.exports = router
