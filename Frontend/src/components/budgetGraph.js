/*import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';

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

export default BudgetGraph;*/

import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';

const BudgetGraph = ({ spent }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [budget, setBudget] = useState(0); // Initialize budget as a number
  const [errorMessage, setErrorMessage] = useState('');
  const backendAPI = "http://localhost:3001/";


  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const response = await axios.get(backendAPI+ 'budget-month/' + userId + '/' + currentMonth + '/' + currentYear, { withCredentials: true });

        if (response.data) {
          setBudget(response.data.amount);
        } else {
          setErrorMessage('No budget found for the current month.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Error fetching budget.');
      }
    };

    if (userId) {
      fetchBudget();
    }
  }, [userId]);

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

export default BudgetGraph;