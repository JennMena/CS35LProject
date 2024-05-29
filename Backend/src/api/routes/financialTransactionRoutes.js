const express = require('express');
const router =  express.Router();
const FinancialTransactionController = require('../controllers/financialTransactionController.js');
const isAuthenticated = require('../controllers/authMiddleware');

router.post('/financialtransaction', isAuthenticated, FinancialTransactionController.addFinancialTransaction); 

router.get('/financialtransaction', isAuthenticated, FinancialTransactionController.getAllFinancialTransactions); 

module.exports = router;