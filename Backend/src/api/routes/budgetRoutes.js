const express = require('express');
const router =  express.Router();
const { getConnection, sql } = require('../../config/database'); //eliminar despues

const budgetController = require('../controllers/budgetController.js');

router.get('/budgets', budgetController.getAllBudgets);

//router.get('/users/:id', appUserController.getUserById);

router.post('/budgets', budgetController.addBudget); 

module.exports = router;