import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import BudgetForm from './budgetForm';
import BudgetGraph from './budgetGraph';
import axios from 'axios';
import './homePage.css'; // Import the new CSS file

const HomePage = () => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Define backendAPI or import it from a configuration file
        const backendAPI = "http://localhost:3001/";
        const response = await axios.get(backendAPI + 'users/' + userId, { withCredentials: true });
        if (response.data.id) {
          setUserId(response.data.id);
          localStorage.setItem('userId', response.data.id);
        } 
      } catch (error) {
        console.error('Error verifying user:', error);
        // Redirect to sign-in page if there's an error
        navigate('/sign-in');
      }
    };

    if (userId) {
      verifyUser();
    }
    // Include userId and navigate in the dependency array
  }, [userId, navigate]);

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
      <BudgetGraph />
    </div>
  );
};

export default HomePage;