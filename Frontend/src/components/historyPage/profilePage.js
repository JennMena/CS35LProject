import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backendAPI = "http://localhost:3001/";

const ProfilePage = () => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [firstName, setFirstName] =useState(localStorage.getItem('firstName'))
  const [lastName, setLasttName] =useState(localStorage.getItem('lastName'))
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(backendAPI + 'users/' + userId, { withCredentials: true });
        if (response.data.id) {
          setUserId(response.data.id);
          setFirstName(response.data.firstName);
          setLasttName(response.data.lastName);
          localStorage.setItem('userId', response.data.id);
          localStorage.setItem('firstName',response.data.firstName);
          localStorage.setItem('lastName', response.data.lastName);
          setUserData(response.data); // Set user data after successful response
        } 
      } catch (error) {
        console.error('Error verifying user:', error);
      }
    };

    if (userId) {
      verifyUser();
    } else {
      navigate('/sign-in');
    }
  }, [userId, navigate]);

  return (
    <div>
      <h1>Profile Page</h1>
      {userData ? (
        <div>
          <p> User ID Number: {userData.userId}</p>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p> User since: {userData.registerDate}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ProfilePage;
