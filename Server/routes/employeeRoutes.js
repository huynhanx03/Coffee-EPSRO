const express = require('express');
const router = express.Router();
const employeePositionController = require('../controllers/employeePositionController');
const employeeController = require('../controllers/employeeController')

router.get('/positions', employeePositionController.getEmployeePositionHandler);
router.get('/employees', employeeController.getEmployeesHandle)
router.post('/employee', employeeController.addEmployeeHandler)
router.put('/employee/:employeeID', employeeController.updateEmployeeHandler)
router.delete('/employee/:employeeID', employeeController.deleteEmployeeHandler)

module.exports = router