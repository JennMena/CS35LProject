const express = require('express');
const router =  express.Router();
const FTFController = require('../controllers/FTFController.js');

router.post('/ftf', FTFController.addFTF); 

router.get('/ftf', FTFController.getAllFTFs); 

module.exports = router;