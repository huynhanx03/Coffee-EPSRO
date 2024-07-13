const express = require('express')
const router = express.Router()
const voucherController = require('../controllers/voucherController')

router.get('vouchers/:userId', voucherController.getVoucher)
router.post('/update/:voucherId/:userId', voucherController.updateVoucherUsed)
router.get('/vouchers', voucherController.getVouchersHandler);
router.post('/voucher', voucherController.addVoucherHandler);
router.delete('/vouchers/:voucherId', voucherController.deleteVoucherHandler);

module.exports = router
