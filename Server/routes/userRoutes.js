const express = require('express');
const router = express.Router();
const userController = require('../controllers/Mobile/userController');
const { registerValidationRules, validate } = require('../middleware/validators');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/register', registerValidationRules(), validate, userController.register);
router.post('/login', userController.login);
router.get('/:userId', userController.getUserById);

module.exports = router;