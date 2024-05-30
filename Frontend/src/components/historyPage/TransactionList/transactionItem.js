import React, { useState, useEffect } from 'react';
import axios from 'axios';

const backendAPI = "http://localhost:3001/";

const TransactionItem = ({ transaction }) => {
  const [categoryName, setCategoryName] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(backendAPI + 'category/' + transaction.categoryId, { withCredentials: true });
        setCategoryName(response.data.name);
        let categoryType = response.data.type;
        if (categoryType === "I") {
          setType("Income");
        } else if (categoryType === "E") {
          setType("Expense");
        } else {
          setType(categoryType); // fallback for any other types
        }
      } catch (error) {
        console.error('Error when getting category:', error);
      }
    };

    fetchCategoryDetails();
  }, [transaction.categoryId]);

  return (
    <li>
      <p>Type: {type}</p>
      <p>Date: {new Date(transaction.transactionDate).toLocaleDateString()}</p>
      <p>Category: {categoryName}</p>
      <p>Amount: ${transaction.amount}</p>
      <p>Description: {transaction.description}</p>
      <p>Canceled: {transaction.canceled ? 'Yes' : 'No'}</p>
    </li>
  );
};

export default TransactionItem;
