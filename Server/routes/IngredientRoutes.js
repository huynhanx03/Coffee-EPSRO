const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/IngredientController');

router.get('/ingredients', ingredientController.getIngredientsHandle)
router.get('/units', ingredientController.getUnitsHandler)
router.post('/ingredient', ingredientController.addIngredientHandler)
router.put('/ingredient/:ingredientID', ingredientController.updateIngredientHandler)
router.delete('/ingredient/:ingredientID', ingredientController.deleteIngredientHandler)
router.put('/quantity-ingredient/:ingredientID', ingredientController.updateQuantityIngredientHandler)

module.exports = router