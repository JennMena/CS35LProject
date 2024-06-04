/*import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';

const BudgetGraph = () => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [budget, setBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [earned, setEarned] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const backendAPI = "http://localhost:3001/";

  useEffect(() => {
    const fetchBudgetAndExpenses = async () => {
      try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        // Fetch the budget
        const budgetResponse = await axios.get(`${backendAPI}budget-month/${userId}/${currentMonth}/${currentYear}`, { withCredentials: true });
        if (budgetResponse.data) {
          setBudget(budgetResponse.data.amount);
        } else {
          setErrorMessage('No budget found for the current month.');
        }

        // Fetch the total expenses
        const expenseResponse = await axios.get(`${backendAPI}totalsum-month/${userId}/E/${currentMonth}/${currentYear}`, { withCredentials: true });
        if (expenseResponse.data) {
          setSpent(expenseResponse.data.total);
        } else {
          setErrorMessage('No expenses found for the current month.');
        }

        // Fetch the total income
        const incomeResponse = await axios.get(`${backendAPI}totalsum-month/${userId}/I/${currentMonth}/${currentYear}`, { withCredentials: true });
        if (incomeResponse.data) {
          setEarned(incomeResponse.data.total);
        } else {
          setErrorMessage('No income found for the current month.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Error fetching budget, expenses, and income.');
      }
    };

    if (userId) {
      fetchBudgetAndExpenses();
    }
  }, [userId]);

  if (budget <= 0) {
    return null; 
  }

  const remaining = budget - spent + earned;

  const budgetChartData = [
    { title: 'Budget', value: budget, color: '#007bff' },
    { title: 'Spent', value: spent, color: '#dc3545' },
    { title: 'Earned', value: earned, color: '#28a745' },
  ];

  const remainingChartData = [
    { title: 'Remaining', value: remaining, color: '#4CAF50' },
    { title: 'Spent', value: spent, color: '#FF5722' },
  ];

  const formatAsDollars = (amount) => `$${amount.toFixed(2)}`;

  const labelStyle = { fontSize: '3px' };

  return (
    <div>
      <h2>Budget Overview:</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div style={{ display: 'flex', marginTop: '-30px', gap: '20px' }}>
        <div style={{ flex: 1.2 }}>
          <h4 style={{ marginBottom: '-20px' }}>Budget, Spent, and Income</h4> 
          <PieChart
            data={budgetChartData}
            label={({ dataEntry }) => `${dataEntry.title}: ${formatAsDollars(dataEntry.value)}`}
            labelStyle={labelStyle}
            radius={40} // Adjust the radius here
          />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ marginBottom: '-20px' }}>Remaining and Spent</h4>
          <PieChart
            data={remainingChartData}
            label={({ dataEntry }) => `${dataEntry.title}: ${formatAsDollars(dataEntry.value)}`}
            labelStyle={labelStyle}
            radius={40} // Adjust the radius here
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetGraph;*/

import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';

const BudgetGraph = () => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [budget, setBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [earned, setEarned] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const backendAPI = "http://localhost:3001/";

  useEffect(() => {
    const fetchBudgetAndExpenses = async () => {
      try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        // Fetch the budget
        const budgetResponse = await axios.get(`${backendAPI}budget-month/${userId}/${currentMonth}/${currentYear}`, { withCredentials: true });
        if (budgetResponse.data) {
          setBudget(budgetResponse.data.amount || 0);
        } else {
          setErrorMessage('No budget found for the current month.');
        }

        // Fetch the total expenses
        const expenseResponse = await axios.get(`${backendAPI}totalsum-month/${userId}/E/${currentMonth}/${currentYear}`, { withCredentials: true });
        if (expenseResponse.data) {
          setSpent(expenseResponse.data.total || 0);
        } else {
          setErrorMessage('No expenses found for the current month.');
        }

        // Fetch the total income
        const incomeResponse = await axios.get(`${backendAPI}totalsum-month/${userId}/I/${currentMonth}/${currentYear}`, { withCredentials: true });
        if (incomeResponse.data) {
          setEarned(incomeResponse.data.total || 0);
        } else {
          setErrorMessage('No income found for the current month.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Error fetching budget, expenses, and income.');
      }
    };

    if (userId) {
      fetchBudgetAndExpenses();
    }
  }, [userId]);

  const remaining = (budget || 0) - (spent || 0) + (earned || 0);

  const budgetChartData = [
    ...(budget > 0 ? [{ title: 'Budget', value: budget, color: '#007bff' }] : []),
    ...(spent > 0 ? [{ title: 'Spent', value: spent, color: '#FF5722' }] : []),
    ...(earned > 0 ? [{ title: 'Income', value: earned, color: '#28a745' }] : [])
  ];

  const remainingChartData = [
    ...(remaining > 0 ? [{title: 'Remaining', value: remaining, color: '#4CAF50' }] : []),
    ...(spent > 0 ? [{ title: 'Spent', value: spent, color: '#dc3545' }] : []),
  ];

  const formatAsDollars = (amount) => `$${(amount || 0).toFixed(2)}`;

  const labelStyle = { fontSize: '3px' };

  return (
    <div>
      <h2>Budget Overview:</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div style={{ display: 'flex', marginTop: '-30px' }}>
        <div style={{ flex: 1.25 }}>
          <h4 style={{ marginBottom: '-30px' }}>Budget, Spent, and Income</h4>
          <PieChart
            data={budgetChartData}
            label={({ dataEntry }) => `${dataEntry.title}: ${formatAsDollars(dataEntry.value)}`}
            labelStyle={labelStyle}
            radius={40}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ marginBottom: '-30px' }}>Remaining and Spent</h4>
          <PieChart
            data={remainingChartData}
            label={({ dataEntry }) => `${dataEntry.title}: ${formatAsDollars(dataEntry.value)}`}
            labelStyle={labelStyle}
            radius={40}
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetGraph;

/*import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';

const BudgetGraph = () => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [budget, setBudget] = useState(0); // Initialize budget as a number
  const [spent, setSpent] = useState(0); // Initialize spent as a number
  const [earned, setEarned] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const backendAPI = "http://localhost:3001/";

  useEffect(() => {
    const fetchBudgetAndExpenses = async () => {
      try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        // Fetch the budget
        const budgetResponse = await axios.get(`${backendAPI}budget-month/${userId}/${currentMonth}/${currentYear}`, { withCredentials: true });
        if (budgetResponse.data) {
          setBudget(budgetResponse.data.amount);
        } else {
          setErrorMessage('No budget found for the current month.');
        }

        // Fetch the total expenses
        const expenseResponse = await axios.get(`${backendAPI}totalsum-month/${userId}/E/${currentMonth}/${currentYear}`, { withCredentials: true });
        if (expenseResponse.data) {
          setSpent(expenseResponse.data.total);
        } else {
          setErrorMessage('No expenses found for the current month.');
        }
        //This returns the all income or expenses of the month of that user. For expenses send 'E' for type, else 'I'
//It excludes cancelled transactions
//router.get('/transactionsbytype-month/:appUserId/:type/:month/:year', FinancialTransactionController.getTransWithUserIdAndMonth);  
        // Fetch the total income
        const incomeResponse = await axios.get(`${backendAPI}totalsum-month/${userId}/I/${currentMonth}/${currentYear}`, { withCredentials: true });
        if (incomeResponse.data) {
          setEarned(incomeResponse.data.total);
        } else {
          setErrorMessage('No expenses found for the current month.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Error fetching budget and expenses.');
      }
    };

    if (userId) {
      fetchBudgetAndExpenses();
    }
  }, [userId]);

  if (budget <= 0) {
    return null; // If budget is not entered, return null to not render anything
  }

  const remaining = budget - spent + earned;

  const data = [
    { title: 'Remaining', value: remaining, color: '#4CAF50' },
    { title: 'Spent', value: spent, color: '#FF5722' },
  ];

  const formatAsDollars = (amount) => {
    return `$${amount.toFixed(2)}`; // Format amount as dollars with 2 decimal places
  };

  const labelStyle = {
    fontSize: '5px', // Set the font size to a smaller value
  };

  return (
    <div>
      <h2>Budget Overview</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <PieChart
        data={data}
        label={({ dataEntry }) => `${dataEntry.title}: ${formatAsDollars(dataEntry.value)}`}
        labelStyle={labelStyle} // Apply the custom label style
      />
    </div>
  );
};

export default BudgetGraph;*/

/*import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';

const BudgetGraph = () => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [budget, setBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [earned, setEarned] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const backendAPI = "http://localhost:3001/";

  useEffect(() => {
    const fetchBudgetAndExpenses = async () => {
      try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        // Fetch the budget
        const budgetResponse = await axios.get(`${backendAPI}budget-month/${userId}/${currentMonth}/${currentYear}`, { withCredentials: true });
        if (budgetResponse.data) {
          setBudget(budgetResponse.data.amount);
        } else {
          setErrorMessage('No budget found for the current month.');
        }

        // Fetch the total expenses
        const expenseResponse = await axios.get(`${backendAPI}totalsum-month/${userId}/E/${currentMonth}/${currentYear}`, { withCredentials: true });
        if (expenseResponse.data) {
          setSpent(expenseResponse.data.total);
        } else {
          setErrorMessage('No expenses found for the current month.');
        }

        // Fetch the total income
        const incomeResponse = await axios.get(`${backendAPI}totalsum-month/${userId}/I/${currentMonth}/${currentYear}`, { withCredentials: true });
        if (incomeResponse.data) {
          setEarned(incomeResponse.data.total);
        } else {
          setErrorMessage('No income found for the current month.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Error fetching budget, expenses, and income.');
      }
    };

    if (userId) {
      fetchBudgetAndExpenses();
    }
  }, [userId]);

  if (budget <= 0) {
    return null; 
  }

  const remaining = budget - spent + earned;

  const budgetChartData = [
    { title: 'Budget', value: budget, color: '#007bff' },
    { title: 'Spent', value: spent, color: '#dc3545' },
    { title: 'Earned', value: earned, color: '#28a745' },
  ];

  const remainingChartData = [
    { title: 'Remaining', value: remaining, color: '#4CAF50' },
    { title: 'Spent', value: spent, color: '#FF5722' },
  ];

  const formatAsDollars = (amount) => `$${amount.toFixed(2)}`;

  const labelStyle = { fontSize: '3px' };

  return (
    <div>
      <h2>Budget Overview:</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div style={{ display: 'flex', marginTop: '-30px', gap: '30px' }}>
        <div style={{ flex: 1.3 }}>
          <h4>Budget, Spent, and Income</h4>
          <PieChart
            data={budgetChartData}
            label={({ dataEntry }) => `${dataEntry.title}: ${formatAsDollars(dataEntry.value)}`}
            labelStyle={labelStyle}
            radius={40} // Adjust the radius here
          />
        </div>
        <div style={{ flex: 1 }}>
          <h4>Remaining and Spent</h4>
          <PieChart
            data={remainingChartData}
            label={({ dataEntry }) => `${dataEntry.title}: ${formatAsDollars(dataEntry.value)}`}
            labelStyle={labelStyle}
            radius={40} // Adjust the radius here
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetGraph;*/

/*import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';

const BudgetGraph = ({ userId }) => {
  const [budget, setBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [earned, setEarned] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const backendAPI = "http://localhost:3001/";

  useEffect(() => {
    const fetchBudgetAndExpenses = async () => {
      try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const budgetResponse = await axios.get(`${backendAPI}budget-month/${userId}/${currentMonth}/${currentYear}`, { withCredentials: true });
        if (budgetResponse.data) {
          setBudget(budgetResponse.data.amount);
        } else {
          setErrorMessage('No budget found for the current month.');
        }

        const expenseResponse = await axios.get(`${backendAPI}totalsum-month/${userId}/E/${currentMonth}/${currentYear}`, { withCredentials: true });
        if (expenseResponse.data) {
          setSpent(expenseResponse.data.total);
        } else {
          setErrorMessage('No expenses found for the current month.');
        }

        const incomeResponse = await axios.get(`${backendAPI}totalsum-month/${userId}/I/${currentMonth}/${currentYear}`, { withCredentials: true });
        if (incomeResponse.data) {
          setEarned(incomeResponse.data.total);
        } else {
          setErrorMessage('No income found for the current month.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Error fetching budget, expenses, and income.');
      }
    };

    if (userId) {
      fetchBudgetAndExpenses();
    }
  }, [userId]);

  if (budget <= 0) {
    return null;
  }

  const remaining = budget - spent + earned;

  const pieChartData = {
    labels: ['Remaining', 'Spent'],
    datasets: [
      {
        data: [remaining, spent],
        backgroundColor: ['#4CAF50', '#FF5722']
      }
    ]
  };

  const barChartData = {
    labels: ['Budget', 'Earned', 'Expense', 'Remaining'],
    datasets: [
      {
        label: 'Amount',
        backgroundColor: ['#3e95cd', '#8e5ea2', '#FF5722', '#4CAF50'],
        data: [budget, earned, spent, remaining]
      }
    ]
  };

  const pieChartOptions = {
    legend: {
      display: true,
      position: 'right'
    },
    title: {
      display: true,
      text: 'Pie Chart'
    }
  };

  const barChartOptions = {
    legend: {
      display: true
    },
    title: {
      display: true,
      text: 'Bar Graph'
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <Pie data={pieChartData} options={pieChartOptions} />
      </div>
      <div style={{ flex: 1 }}>
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </div>
  );
};

export default BudgetGraph;*/