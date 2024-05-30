import React from 'react';

const ExpenseList = ({ expenses }) => {
  return (
    <div>
      <h2>Expense List:</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            <strong>Amount:</strong> ${expense.amount.toFixed(2)} - 
            <strong> Category/Reason:</strong> {expense.reason} - 
            <strong> Time:</strong> {expense.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;