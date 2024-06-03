import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

const BudgetForm = ({ onBudgetSubmit, onExpenseSubmit }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [budgetAmount, setBudgetAmount] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseReason, setExpenseReason] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]); // State for categories

  const [errorMessage, setErrorMessage] = useState('');

  const backendAPI = "http://localhost:3001/";

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

    /*router.get('/budgets', budgetController.getAllBudgets);
    router.get('/budget-user/:appUserId', budgetController.getBudgetByUserId);
    router.get('/budgets/:id', budgetController.getBudgetById);
    router.put('/budgets', budgetController.updateBudget);
    router.delete('/budgets/:id', budgetController.deleteBudget);
    router.post('/budgets', budgetController.addBudget);
    router.get('/budget-month/:appUserId/:month/:year', budgetController.getBudgetByUserIdAndMonth);*/

    axios.get(backendAPI + 'budget-month' + userId + '/' + currentMonth + '/' + currentYear, requestData, { withCredentials: true })
      .then((response) => {
        if (response.data){
          axios.put(backendAPI + 'budgets', requestData, { withCredentials: true })
          .then((response) => {
            if (response.data) {
              console.log('Success:', response.data);
            } else {
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
      window.location.reload();
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
 /*router.post('/financialtransaction', FinancialTransactionController.addFinancialTransaction); 
router.get('/financialtransaction', FinancialTransactionController.getAllFinancialTransactions);
router.get('/financialtransaction-user/:appUserId', FinancialTransactionController.getTransactionsByUserId);  
router.put('/financialtransaction', FinancialTransactionController.updateFinancialTransaction);

//Gets all the financial trasaction of one user
//It doesn't cancelled transactions
router.delete('/financialtransaction/:id', FinancialTransactionController.deleteFinancialTransaction);
//This returns the all income or expenses of the month of that user. For expenses send 'E' for type, else 'I'
//It excludes cancelled transactions
router.get('/transactionsbytype-month/:appUserId/:type/:month/:year', FinancialTransactionController.getTransWithUserIdAndMonth);  

//All transactions income and expenses for the given month
//It excludes cancelled transactions
router.get('/transactions-month/:appUserId/:month/:year', FinancialTransactionController.getAllTransactionsOfMonth);  

//This returns a JSON like { "total": # } with the sum of expenses or income of the given user and month 
//It excludes cancelled transactions
router.get('/totalsum-month/:appUserId/:type/:month/:year', FinancialTransactionController.getSumOfTransactionsByTypeAndMonth);*/

    // Prepare the data to match the backend API requirements
    const currentDate = new Date();

    const requestData = {
      appUserId: userId, // Assuming userId is defined somewhere in the parent component
      categoryId: selectedCategory,
      amount: parseFloat(expenseAmount),
      transactionDate: currentDate,
      description: expenseReason,
      canceled: 0,
    };

    /*const FinancialTransaction = new FinancialTransactionModel(
      req.body.id,
      req.body.appUserId,
      req.body.categoryId,
      req.body.amount,
      req.body.transactionDate,
      req.body.description,
      req.body.canceled
  );*/


    //router.post('/financialtransaction', FinancialTransactionController.addFinancialTransaction); 

    axios.post(backendAPI+ 'financialtransaction', requestData, { withCredentials: true })
      .then((response) => {
        if (response.data) {
          console.log('Success:', response.data);
          // Store the user ID in local storage
          // Redirect to home page on successful login
        } else {
          // Handle login failure
          setErrorMessage('transaction did not go through');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Budget couldnt be set');
      });
      window.location.reload();
  };

  // Fetch categories from the backend API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendAPI}categories/${userId}`);
        setCategories(response.data);
      } catch (error) {
        setErrorMessage('Error fetching categories');
      }
    };

    fetchCategories(); // Call the fetchCategories function when the component mounts
  }, [userId]);

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
        <button type="submit">Set and/or Update Budget</button>
      </form>
      <form onSubmit={handleExpenseSubmit}>
        <label>
          Enter expense or income amount (in dollars):
          <input 
            type="number" 
            value={expenseAmount} 
            onChange={handleExpenseChange} 
            placeholder="$" 
          />
        </label>
        <label>
          Category:
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select category...</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </label>
        <label>
          Reason:
          <input 
            type="text" 
            value={expenseReason} 
            onChange={handleReasonChange} 
          />
        </label>
        <button type="submit">Add Expense and/or Income</button>
      </form>
    </div>
  );
};

export default BudgetForm;