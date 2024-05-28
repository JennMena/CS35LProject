const express = require('express');
const router =  express.Router();
const budgetController = require('../controllers/budgetController.js');

router.get('/budgets', budgetController.getAllBudgets);


router.post('/budgets', budgetController.addBudget); 


module.exports = router;