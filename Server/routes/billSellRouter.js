const express = require('express');
const router = express.Router();
const billSellController = require('../controllers/billSellController');

router.post('/bill-sell', billSellController.addBillSellHandler);
router.get('/bill-sells', billSellController.getBillSellsHandler);
router.put('/bill-sell/:billSellID', billSellController.updateBillSellHandler);
router.delete('/bill-sell/:billSellID', billSellController.deleteBillSellHandler);
router.get('/bill-sell-unpaid', billSellController.getBillSellByTableAndStatusHandler);
router.put('/bill-sell-table-booking', billSellController.updateTableBookingHandler);
router.put('/merge-bill', billSellController.mergeTablesHandler);

module.exports = router;