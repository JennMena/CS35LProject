import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TransactionList from './TransactionList/transactionList'; // Ensure the correct import path
import './historyPage.css'; // Import the new CSS file

const backendAPI = "http://localhost:3001/";

const HistoryPage = () => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  //console.log(userId);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(backendAPI + 'users/' + userId, { withCredentials: true });
        if (response.data.id) {
          setUserId(response.data.id);
          localStorage.setItem('userId', response.data.id);
        } 
      } catch (error) {
        console.error('Error verifying user:', error);
      }
    };

    if (userId) {
      verifyUser();
    }
    else{
        navigate('/sign-in');
    }
  }, [userId, navigate]);

  return (
    <div className="history-page-container">
      <h1>History Page</h1>
      {userId ? (
        <>
        <TransactionList userId={userId} />
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default HistoryPage;
