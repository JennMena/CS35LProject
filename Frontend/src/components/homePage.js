import React, { useState } from 'react';
import BudgetForm from './budgetForm';
import BudgetGraph from './budgetGraph';
import ExpenseList from './expenseList';
import './homePage.css'; // Import the new CSS file

const HomePage = () => {
  const [budget, setBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [expenses, setExpenses] = useState([]);

  const handleBudgetSubmit = (budgetAmount) => {
    setBudget(budgetAmount);
  };

  const handleExpenseSubmit = (expenseAmount, expenseReason) => {
    setSpent(spent + expenseAmount);
    const newExpense = {
      amount: expenseAmount,
      reason: expenseReason,
      time: new Date().toLocaleString()
    };
    setExpenses([...expenses, newExpense]);
  };

  return (
    <div className="home-page-container">
      <h1>Expense Tracker</h1>
      <BudgetForm onBudgetSubmit={handleBudgetSubmit} onExpenseSubmit={handleExpenseSubmit} />
      <BudgetGraph budget={budget} spent={spent} />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default HomePage;