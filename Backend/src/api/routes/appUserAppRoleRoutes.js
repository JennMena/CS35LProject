const express = require('express');
const router = express.Router();

const appUserAppRoleController = require('../controllers/appUserAppRoleController.js');

router.post('/user-role', appUserAppRoleController.addAppUserAppRole);

router.get('/user-role/:appUserId', appUserAppRoleController.getUserRoles);

router.get('/user-role', appUserAppRoleController.getAllAppUserAppRoles);

router.delete('/user-role/:appUserId/:appRoleId', appUserAppRoleController.deleteAppUserAppRole);

module.exports = router;
