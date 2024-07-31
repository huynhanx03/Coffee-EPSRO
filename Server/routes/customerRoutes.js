const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customerController')

router.get('/customers', customerController.getCustomersHandle)
router.get('/rankCustomers', customerController.getRankCustomersHandle)
router.post('/customer', customerController.addCustomerHandler)
router.put('/customer/:customerID', customerController.updateCustomerHandler)
router.delete('/customer/:customerID', customerController.deleteCustomerHandler)

module.exports = router
