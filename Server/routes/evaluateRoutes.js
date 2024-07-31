const express = require('express');
const router = express.Router();
const evaluateController = require('../controllers/evaluateController');

router.get('/evaluates', evaluateController.getEvaluatesHandler);
router.delete('/evaluate/:evaluateID', evaluateController.deleteEvaluateHandler);

module.exports = router;