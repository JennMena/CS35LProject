const BudgetModel = require('../../models/budgetModel.js');
const BudgetService = require('../../services/budgetService.js')

const getAllBudgets = async (req, res) => {
    try {
        const allBudgets = await BudgetService.getAllBudgets();
        res.status(200).json(allBudgets);
    } catch (error) {
        console.error('Function controllers/getAllBudgets error:', error);
        res.status(500).send('Error when getting Budgets from the database');
    }
};

const addBudget = async (req, res) => {
    try {
        const Budget = new BudgetModel(
            req.body.id,
            req.body.userId,
            req.body.amount,
            req.body.month,
            req.body.year,
            req.body.registrationDate
        );
        const user = await BudgetService.addBudget(Budget);
        //Update to success code after inserting
        res.status(200).json(user);
    } catch (error) {
        console.error('Function controllers/addBudget error:', error);
        res.status(500).send('Error when adding Budget from the database');
    }
};


module.exports = {
    getAllBudgets,
    addBudget
}