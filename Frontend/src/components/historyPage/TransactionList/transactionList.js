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

  return (
    <div className="transaction-list">
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      ) : (
        <p id="no-trans">No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionList;
