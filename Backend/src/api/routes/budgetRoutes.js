const express = require('express');
const router =  express.Router();
const budgetController = require('../controllers/budgetController.js');

router.get('/budgets', budgetController.getAllBudgets);
router.get('/budgets/:id', budgetController.getBudgetById);
router.put('/budgets', budgetController.updateBudget);
router.delete('/users/:id', budgetController.deleteBudget);
router.post('/budgets', budgetController.addBudget); 
module.exports = router;