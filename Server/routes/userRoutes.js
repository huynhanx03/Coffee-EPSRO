const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { registerValidationRules, validate } = require('../middleware/validators');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/register', registerValidationRules(), validate, userController.register);
router.post('/login', userController.login);
router.get('/:userId', userController.getUserById);
router.put('/update/:userId', authenticateToken, userController.updateInfo);
router.put('/update/password/:userId', authenticateToken, userController.updatePassword);
router.get('/forgot/:email', userController.getUserByEmail);
router.put('/user/:userID', userController.updateUserHandler);
router.get('/number-phone/:numberPhone', userController.getUserByNumberphoneHandler);

module.exports = router;