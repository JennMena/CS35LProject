const express = require('express');
const router =  express.Router();
const FTFController = require('../controllers/FTFController.js');
const isAuthenticated = require('../controllers/authMiddleware');

router.post('/ftf', isAuthenticated, FTFController.addFTF); 

router.get('/ftf', isAuthenticated, FTFController.getAllFTFs); 

module.exports = router;