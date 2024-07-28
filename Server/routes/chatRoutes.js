const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chatController')

router.get('/userContacts', chatController.getUserContactsHandler)
router.get('/messages/:userID', chatController.getMessagesHandler)
router.post('/messages/:userID', chatController.addMessageHandler)

module.exports = router
