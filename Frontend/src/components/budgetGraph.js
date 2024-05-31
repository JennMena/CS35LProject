import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const BudgetGraph = ({ budget, spent }) => {
  // Check if budget is greater than 0
  if (budget <= 0) {
    return null; // If budget is not entered, return null to not render anything
  }

  const remaining = budget - spent;

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
      <PieChart
        data={data}
        label={({ dataEntry }) => `${dataEntry.title}: ${formatAsDollars(dataEntry.value)}`}
        labelStyle={labelStyle} // Apply the custom label style
      />
    </div>
  );
};

export default BudgetGraph;

/*import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios'; // Import axios

const BudgetGraph = ({ spent}) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [budget, setBudgetAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const backendAPI = "http://localhost:3001/";

    // Prepare the data to match the backend API requirements
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    const currentYear = currentDate.getFullYear();

    const requestData = {
      userId: userId, // Assuming userId is defined somewhere in the parent component
      amount: parseFloat(budget),
      month: currentMonth,
      year: currentYear
    };

    axios.get(backendAPI + 'budgets/1', requestData, { withCredentials: true })
      .then((response) => {
        if (response.data){
          budget=response.data.amount;
        }
        else{
          return null
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Graph couldnt be set');
      })
    };   
      // Check if budget is greater than 0

  const remaining = budget - spent;

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

const BudgetGraph = ({ spent }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [budget, setBudget] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const backendAPI = "http://localhost:3001/";

  useEffect(() => {
   const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        
        axios.get(backendAPI + 'budgets/1', requestData, { withCredentials: true })
        .then((response) => {
          if (response.data){
            setBudget(response.data.amount);
          } else {
            setErrorMessage('No budget found for the current month.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setErrorMessage('Budget couldnt be set');
        });
    };
  },

  if (budget <= 0) {
    return null; // If budget is not entered, return null to not render anything
  }

  const remaining = budget - spent;

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

