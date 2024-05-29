const FinancialTransactionModelModel = require('../../models/FTFModel.js');
const FinancialTransactionService = require('../../services/FTFService.js')

const getAllFinancialTransactions = async (req, res) => {
    try {
        const allFinancialTransactions = await FinancialTransactionService.getAllFinancialTransactions();
        res.status(200).json(allFinancialTransactions);
    } catch (error) {
        console.error('Function controllers/getAllFinancialTransactions error:', error);
        res.status(500).send('Error when getting FinancialTransactions from the database');
    }
};

const addFinancialTransaction = async (req, res) => {
    try {
        const FinancialTransaction = new FinancialTransactionModelModel(
            req.body.id,
            req.body.appUserId,
            req.body.categoryId,
            req.body.amount,
            req.body.transactionDate,
            req.body.description,
            req.body.canceled
        );
        const user = await FinancialTransactionService.addFinancialTransaction(FinancialTransaction);
        //Update to success code after inserting
        res.status(200).json(user);
    } catch (error) {
        console.error('Function controllers/addFinancialTransaction error:', error);
        res.status(500).send('Error when adding FinancialTransaction from the database');
    }
};


module.exports = {
    getAllFinancialTransactions,
    addFinancialTransaction
}