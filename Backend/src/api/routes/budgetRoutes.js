const express = require('express');
const router =  express.Router();
const budgetController = require('../controllers/budgetController.js');

router.get('/budgets', budgetController.getAllUsers);

router.get('/budgets/:id', budgetController.getUserById);

router.post('/budgets', budgetController.addUser); 

router.put('/budgets', budgetController.updateUser); 

router.delete('/budgets/:id', budgetController.deleteUser); 

module.exports = router;