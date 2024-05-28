const express = require('express');
const router =  express.Router();
const FinancialTransactionController = require('../controllers/financialTransactionController.js');

router.post('/financialtransaction', FinancialTransactionController.addFinancialTransaction); 
router.get('/financialtransaction', FinancialTransactionController.getAllFinancialTransactions); 
router.put('/financialtransaction', FinancialTransactionController.updateFinancialTransaction);
router.delete('/users/:id', FinancialTransactionController.deleteFinancialTransaction);
router.post('/budgets', FinancialTransactionController.addFinancialTransaction); 
module.exports = router;