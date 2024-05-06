const express = require('express');
const router =  express.Router();
const { getConnection, sql } = require('../../config/database'); //eliminar despues

const appUserController = require('../controllers/appUserController.js');

router.get('/users', appUserController.getAllUsers);

//router.get('/users/:id', appUserController.getUserById);

router.post('/users', appUserController.addUser); 

module.exports = router;