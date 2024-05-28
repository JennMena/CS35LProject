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