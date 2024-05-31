import React, { useState, useEffect } from 'react';
import axios from 'axios';
import editIcon from './edit.svg';
import deleteIcon from './delete.svg';

const backendAPI = "http://localhost:3001/";

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
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
          setType("Expense");}
      } catch (error) {
        console.error('Error when getting category:', error);
      }
    };

    fetchCategoryDetails();
  }, [transaction.categoryId]);

  return (
    <li className={`transaction-item ${type === 'Income' ? 'income' : 'expense'}`}>
      <p><strong>Type:</strong> {type}</p>
      <p><strong>Date:</strong> {new Date(transaction.transactionDate).toLocaleDateString()}</p>
      <p><strong>Category:</strong> {categoryName}</p>
      <p><strong>Amount:</strong> ${transaction.amount}</p>
      <p><strong>Description:</strong> {transaction.description}</p>
      <p><strong>Canceled:</strong> {transaction.canceled ? 'Yes' : 'No'}</p>
      <div className="buttons">
        <button className="edit" onClick={() => onEdit(transaction.id)}><img src={editIcon} alt="Edit" /></button>
        <button className="delete" onClick={() => onDelete(transaction.id)}><img src={deleteIcon} alt="Delete" /></button>
      </div>
    </li>
  );
};

export default TransactionItem;
