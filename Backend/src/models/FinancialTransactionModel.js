class FinancialTransaction {
    constructor (id, appUserId, categoryId, amount, registrationDate, frequency, dayOfMonth, description, enabled, fk_FinancialTransactionFixed_appUserId, fk_FinancialTransactionFixed_categoryId){
        this.id = id; 
        this.appUserId = appUserId;
        this.categoryId = categoryId;
        this.amount = amount;
        this.transactionDate = transactionDate;
        this.description = description;
        this.canceled = enabled;
        this.fk_FinancialTransaction_appUserId = fk_FinancialTransaction_appUserId;
        this.fk_FinancialTransaction_categoryId = fk_FinancialTransaction_categoryId;
    }
}

module.exports = FinancialTransaction;