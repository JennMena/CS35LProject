const express = require('express');
const router =  express.Router();

const appUserController = require('../controllers/appUserController.js');

router.get('/users', appUserController.getAllUsers);

router.get('/users/:id', appUserController.getUserById);

router.post('/users', appUserController.addUser); 

router.put('/users', appUserController.updateUser); 

router.delete('/users/:id', appUserController.deleteUser); 

router.post('/login', appUserController.login);

module.exports = router;