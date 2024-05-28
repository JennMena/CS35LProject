import React, { useState } from 'react';
import BudgetForm from './budgetForm';
import BudgetGraph from './budgetGraph';
import ExpenseList from './expenseList'; // Import the ExpenseList component

const HomePage = () => {
  const [budget, setBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [expenses, setExpenses] = useState([]); // State for expenses

  const handleBudgetSubmit = (budgetAmount) => {
    setBudget(budgetAmount);
  };

  const handleExpenseSubmit = (expenseAmount, expenseReason) => {
    setSpent(spent + expenseAmount);
    const newExpense = {
      amount: expenseAmount,
      reason: expenseReason,
      time: new Date().toLocaleString() // Example timestamp
    };
    setExpenses([...expenses, newExpense]); // Add new expense to expenses array
  };

  return (
    <div /*style={{ 
        background: 'linear-gradient(45deg, #ffffff, #add8e6)',
        minHeight: '60vh', // Set minimum height to fill the viewport
        padding: '5px' // Add some padding for content
      }}*/>
      <h1>Expense Tracker</h1>
      <BudgetForm onBudgetSubmit={handleBudgetSubmit} onExpenseSubmit={handleExpenseSubmit} />
      <BudgetGraph budget={budget} spent={spent} />
      {/* Pass the expenses array to the ExpenseList component */}
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default HomePage;