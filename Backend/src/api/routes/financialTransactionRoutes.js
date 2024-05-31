const express = require('express');
const router =  express.Router();
const FinancialTransactionController = require('../controllers/financialTransactionController.js');

router.post('/financialtransaction', FinancialTransactionController.addFinancialTransaction); 
router.get('/financialtransaction', FinancialTransactionController.getAllFinancialTransactions);
router.get('/financialtransaction-user/:appUserId', FinancialTransactionController.getTransactionsByUserId);  
router.put('/financialtransaction', FinancialTransactionController.updateFinancialTransaction);
router.delete('/financialtransaction/:id', FinancialTransactionController.deleteFinancialTransaction);

module.exports = router;