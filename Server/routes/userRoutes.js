const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { registerValidationRules, validate } = require('../middleware/validators');

router.post('/register', registerValidationRules(), validate, userController.register);
router.post('/login', userController.login);

module.exports = router;