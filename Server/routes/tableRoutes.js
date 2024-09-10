const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

router.get('/tables', tableController.getTablesHandler);
router.get('/types', tableController.getTypeTablesHandler);
router.post('/table', tableController.addTableHandler);
router.put('/table/:tableID', tableController.updateTableHandler);
router.put('/status-table/:tableID', tableController.updateTableStatusHandler);
router.delete('/table/:tableID', tableController.deleteTableHandler);

module.exports = router;
