const FinancialTransaction = require('../models/FinancialTransactionModel.js');
const { getConnection, sql } = require('../config/database.js');

const getAllFinancialTransactions = async () => {
    try {      //Pool to be an instance of connection *
        const pool = await getConnection(); //Await because the getConnection function is async
        const result = await pool.request().query('SELECT * FROM FinancialTransaction');
        return result.recordset.map(record => new FinancialTransaction(
            record.id,
            record.appUserId,
            record.categoryId,
            record.amount,
            record.transactionDate,
            record.description,
            record.canceled,
            record.fk_FinancialTransaction_appUserId,
            record.fk_FinancialTransaction_categoryId
        ));
    } catch (error) {
        console.log('Function services/getAllFinancialTransactions error:', error);
        throw error;
    }
};

const getFinancialTransactionById = async (id) => {
    try {
        const pool = await getConnection();
        const result = await pool.request() //The following lines are a dynamic query
            .input('idArg', sql.BigInt, id) //Creates SQL argument 'idArg' with the 'id' passed to the function
            .query('SELECT * FROM FinancialTransaction WHERE id = @idArg');
        const record = result.recordset[0];
        if (record) {
            return new FinancialTransaction(
                record.id,
                record.appUserId,
                record.categoryId,
                record.amount,
                record.transactionDate,
                record.description,
                record.canceled,
                record.fk_FinancialTransaction_appUserId,
                record.fk_FinancialTransaction_categoryId
            );
        }
        return null;
    } catch (error) {
        console.log('Function services/getFinancialTransactionById error:', error);
        throw error;
    }
};

const addFinancialTransaction = async (financialTransaction) => {
    try {
        //console.log({financialTransaction});
        const pool = await getConnection();
        const result = await pool.request()
            .input('appUserId', sql.BigInt, financialTransaction.appUserId)
            .input('categoryId',sql.BigInt,financialTransaction.categoryId)
            .input('amount', sql.Money, financialTransaction.amount)
            .input('description', sql.VarChar, financialTransaction.description)
            .input('canceled', sql.Bit, financialTransaction.canceled)
            
            //Query to insert into database
            .query(`INSERT INTO FinancialTransaction (appUserId, categoryId, amount,  description, canceled) VALUES (@appUserId, @categoryId, @amount, @description, @canceled);
            SELECT SCOPE_IDENTITY() as id;`); //Scope identity returns id of the new user added
        return new FinancialTransaction(
            result.recordset[0].id,
            financialTransaction.appUserId,
            financialTransaction.categoryId,
            financialTransaction.amount,
            financialTransaction.description,
            financialTransaction.canceled,
            new Date(),
        );

    } catch (error) {
        console.log('Function services/addFinancialTranscation error:', error);
        throw error;
    }
};

const updateFinancialTransaction = async (FinancialTransaction, id) => {
    try {
        const pool = await getConnection();
        await pool.request()
        .input('appUserId', sql.BigInt, FinancialTransaction.appUserId)
        .input('categoryId',sql.BigInt,FinancialTransaction.categoryId)
        .input('amount', sql.Money, FinancialTransaction.amount)
        .input('description', sql.VarChar, FinancialTransaction.description)
        .input('enabled', sql.Bit, FinancialTransaction.canceled)
            .query('UPDATE Budget SET appUserId = @appUserId,categoryId = @categoryID, amount = @amount, description = @description, canceled = @canceled');
    } catch (error) {
        console.log('Function services/updateFinancialTransaction error:', error);
        throw error;
    }
};

const deleteFinancialTransaction = async (id) => {
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.BigInt, id)
            .query('DELETE FROM FinancialTransaction WHERE id = @id');
        return "Deleted correctly";
    } catch (error) {
        console.log('Function services/deleteFinancialTransaction error:', error);
        throw error;
    }
};

module.exports = {
    getAllFinancialTransactions,
    getFinancialTransactionById,
    addFinancialTransaction,
    updateFinancialTransaction,
    deleteFinancialTransaction
};