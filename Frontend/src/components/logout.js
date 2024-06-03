import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const backendAPI = "http://localhost:3001/";
  const navigate = useNavigate();

  useEffect(() => {
    // Make the HTTP request to log out
    axios.post(backendAPI + 'logout', {}, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          // Clear user data from local storage
          
          // Redirect to login page
          navigate('/sign-in');
        } else {
          console.error('Logout failed:', response);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [navigate, backendAPI]);

  return (
    <div className="logout-container">
      <h3>Logging you out...</h3>
    </div>
  );
};

export default Logout;
