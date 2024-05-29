const express = require('express');
const router =  express.Router();
const FinancialTransactionController = require('../controllers/financialTransactionController.js');

router.post('/financialtransaction', FinancialTransactionController.addFinancialTransaction); 

router.get('/financialtransaction', FinancialTransactionController.getAllFinancialTransactions); 

module.exports = router;