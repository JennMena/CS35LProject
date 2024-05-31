import React, { useState } from 'react';
import axios from 'axios'; // Import axios

const BudgetForm = ({ onBudgetSubmit, onExpenseSubmit }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [budgetAmount, setBudgetAmount] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseReason, setExpenseReason] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const backendAPI = "http://localhost:3001/";

  /*const handleBudgetChange = (e) => {
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

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    onBudgetSubmit(parseFloat(budgetAmount));*/

  const handleBudgetChange = (e) => {
    setBudgetAmount(e.target.value);
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    onBudgetSubmit(parseFloat(budgetAmount));

    // Prepare the data to match the backend API requirements
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    const currentYear = currentDate.getFullYear();

    const requestData = {
      userId: userId, // Assuming userId is defined somewhere in the parent component
      amount: parseFloat(budgetAmount),
      month: currentMonth,
      year: currentYear
    };

    axios.get(backendAPI + 'budgets/1', requestData, { withCredentials: true })
      .then((response) => {
        if (response.data){
          axios.put(backendAPI + 'budgets', requestData, { withCredentials: true })
          .then((response) => {
            if (response.data) {
              console.log('Success:', response.data);
              // Store the user ID in local storage
              // Redirect to home page on successful login
            } else {
              // Handle login failure
              setErrorMessage('Budget did not get updated');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            setErrorMessage('Budget couldnt be updated');
          });
        }
        else{
          axios.post(backendAPI + 'budgets', requestData, { withCredentials: true })
          .then((response) => {
            if (response.data) {
              console.log('Success:', response.data);
              // Store the user ID in local storage
              // Redirect to home page on successful login
            } else {
              // Handle login failure
              setErrorMessage('Budget did not get set');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            setErrorMessage('Budget couldnt be set');
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Budget couldnt be set');
      });   
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
          Category/Reason:
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