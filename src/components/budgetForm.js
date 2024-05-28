import React, { useState } from 'react';

const BudgetForm = ({ onBudgetSubmit, onExpenseSubmit }) => {
  const [budgetAmount, setBudgetAmount] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseReason, setExpenseReason] = useState('');

  const handleBudgetChange = (e) => {
    setBudgetAmount(e.target.value);
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    onBudgetSubmit(parseFloat(budgetAmount));
  };

  const handleExpenseChange = (e) => {
    setExpenseAmount(e.target.value);
  };

  const handleReasonChange = (e) => {
    setExpenseReason(e.target.value);
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmount);
    const reason = expenseReason.trim(); // Trim any leading/trailing whitespace
    if (amount && reason) {
      onExpenseSubmit(amount, reason);
      setExpenseAmount('');
      setExpenseReason('');
    } else {
      alert('Please enter both amount and reason.');
    }
  };

  return (
    <div>
      <form onSubmit={handleBudgetSubmit}>
        <label>
          Enter your budget amount (in dollars):
          <input 
            type="number" 
            value={budgetAmount} 
            onChange={handleBudgetChange} 
            placeholder="$" 
          />
        </label>
        <button type="submit">Set Budget</button>
      </form>
      <form onSubmit={handleExpenseSubmit}>
        <label>
          Enter expense amount (in dollars):
          <input 
            type="number" 
            value={expenseAmount} 
            onChange={handleExpenseChange} 
            placeholder="$" 
          />
        </label>
        <label>
          Reason:
          <input 
            type="text" 
            value={expenseReason} 
            onChange={handleReasonChange} 
          />
        </label>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default BudgetForm;