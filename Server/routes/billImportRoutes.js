const express = require('express');
const router = express.Router();
const billImportController = require('../controllers/billImportController');

router.post('/bill-import', billImportController.addBillImportHandler);
router.delete('/bill-import/:billImportID', billImportController.deleteBillImportHandler);

module.exports = router;