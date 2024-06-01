const express = require('express');
const generateStatementController = require('../controllers/generateStatementController');
const router = express.Router();

router.get('/statement/pdf/:userId', generateStatementController.generateStatementPDF);
router.get('/statement/excel/:userId', generateStatementController.generateStatementExcel);
router.post('/send-statement', generateStatementController.sendStatementEmail);

module.exports = router;