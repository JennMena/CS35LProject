const express = require('express');
const router =  express.Router();

const categoryController = require('../controllers/categoryController.js');

router.post('/category', categoryController.addCategory);

router.get('/category/:appUserId', categoryController.getCategoriesByUserId);

router.get('/category', categoryController.getAllCategories);

router.get('/category/:id/:appUserId', categoryController.getCategoryByIdAndUserId);

router.put('/category', categoryController.updateCategory);

router.delete('/category/:id', categoryController.deleteCategoryById);

module.exports = router;
