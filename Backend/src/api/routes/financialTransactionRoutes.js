const express = require('express');
const router =  express.Router();
const FinancialTransactionController = require('../controllers/financialTransactionController.js');
const isAuthenticated = require('../controllers/authMiddleware');

router.post('/financialtransaction', FinancialTransactionController.addFinancialTransaction); 

router.get('/financialtransaction-user/:appUserId', FinancialTransactionController.getTransactionsByUserId); 

router.get('/financialtransaction/:id', FinancialTransactionController.getFinancialTransactionById);

router.put('/financialtransaction', FinancialTransactionController.updateFinancialTransaction);

router.delete('/financialtransaction/:id', FinancialTransactionController.deleteFinancialTransaction);

module.exports = router;