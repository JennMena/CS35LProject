import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import './homePage.css'; // Import the new CSS file

const ExpenseList = ({ expenses }) => {
  return (
    <div>
      <h3>Please Navigate to the History Page to view your Transactions for Now:</h3>
      <Link to="/history-page">
        <button className="btn btn-primary history-button">Transaction History</button>
      </Link>
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