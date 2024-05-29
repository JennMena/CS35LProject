const express = require('express');
const router =  express.Router();
const budgetController = require('../controllers/budgetController.js');
const isAuthenticated = require('../controllers/authMiddleware');

router.get('/budgets', isAuthenticated, budgetController.getAllBudgets);


router.post('/budgets', isAuthenticated, budgetController.addBudget); 


module.exports = router;