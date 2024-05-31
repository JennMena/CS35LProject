import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backendAPI = "http://localhost:3001/";

const ProfilePage = ({ modalIsOpen, closeModal }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName'));
  const [lastName, setLastName] = useState(localStorage.getItem('lastName'));
  const [registrationDate, setRegistrationDate] = useState(localStorage.getItem('registrationDate'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(backendAPI + 'users/' + userId, { withCredentials: true });
        if (response.data.id) {
          setUserId(response.data.id);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setRegistrationDate(response.data.registrationDate);
          setUsername(response.data.username);
          localStorage.setItem('userId', response.data.id);
          localStorage.setItem('firstName', response.data.firstName);
          localStorage.setItem('lastName', response.data.lastName);
          localStorage.setItem('registrationDate', response.data.registrationDate);
          localStorage.setItem('username', response.data.username);
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
      {userData ? (
        <div>
          <h2>About {userData.username}</h2>
          <p>Username: {userData.username}</p>
          <p>User ID Number: {userData.id}</p>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>User since: {userData.registrationDate}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ProfilePage;