import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionItem from './transactionItem';
import '../historyPage.css'; // Import the CSS file

const backendAPI = "http://localhost:3001/";

const TransactionList = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (userId) {
      const fetchTransactions = async () => {
        try {
          const response = await axios.get(backendAPI + 'financialtransaction-user/' + userId, { withCredentials: true });
          setTransactions(response.data);
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      };

      fetchTransactions();
    }
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Do you want to permanently delete this transaction?");
      if (confirmDelete) {
        const resp = await axios.delete(`${backendAPI}financialtransaction/${id}`);
        if (resp.data === "Deleted correctly") {
          setTransactions(transactions.filter(transaction => transaction.id !== id));
        }
      } else {
        const confirmCancel = window.confirm("Do you want to mark this transaction as canceled instead?");
        if (confirmCancel) {
          const transactionToUpdate = transactions.find(transaction => transaction.id === id);
          const updatedTransaction = { ...transactionToUpdate, canceled: true };
          
          const resp = await axios.put(`${backendAPI}financialtransaction`, updatedTransaction);
          if (resp.status === 200) {
            setTransactions(transactions.map(transaction => 
              transaction.id === id ? { ...transaction, canceled: true } : transaction
            ));
          }
        }
      }
    } catch (error) {
      console.error('Error deleting or canceling transaction:', error);
    }
  };
  

  const handleEdit = async (id) => {
    const updatedTransaction = {
      id,
      appUserId: 'newAppUserId', // Replace with actual data
      categoryId: 'newCategoryId', // Replace with actual data
      amount: 100, // Replace with actual data
      transactionDate: new Date().toISOString(), // Replace with actual data
      description: 'Updated description', // Replace with actual data
      canceled: false, // Replace with actual data
    };

    try {
      const response = await axios.put('/financialtransaction', updatedTransaction);
      setTransactions(transactions.map(transaction =>
        transaction.id === id ? response.data : transaction
      ));
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  return (
    <div className="transaction-list">
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      ) : (
        <p id="no-trans">No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionList;
