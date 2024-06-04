import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backendAPI = "http://localhost:3001/";

const SettingsPage = () => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName'));
  const [lastName, setLastName] = useState(localStorage.getItem('lastName'));
  const [registrationDate, setRegistrationDate] = useState(localStorage.getItem('registrationDate'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [userData, setUserData] = useState(null);
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(`${backendAPI}users/${userId}`, { withCredentials: true });
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
          setUserData(response.data); 
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

  const date = new Date(registrationDate);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const formattedDateMDY = `${monthNames[month]} ${day}, ${year}`;

  const handleFirstNameChange = async () => {
    try {
      const response = await axios.put(`${backendAPI}users/${userId}`, { firstName: newFirstName }, { withCredentials: true });
      setFirstName(response.data.firstName);
      localStorage.setItem('firstName', response.data.firstName);
      setIsEditingFirstName(false);
    } catch (error) {
      console.error('Error updating first name:', error);
    }
  };

  const handleLastNameChange = async () => {
    try {
      const response = await axios.put(`${backendAPI}users`, { lastName: newLastName }, { withCredentials: true });
      setLastName(response.data.lastName);
      localStorage.setItem('lastName', response.data.lastName);
      setIsEditingLastName(false);
    } catch (error) {
      console.error('Error updating last name:', error);
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <div>
        <p>User ID: {userId}</p>
      </div>
      <div>
        <p>Username: {username}</p>
      </div>
      <div>
      <div>
        <p>Registration Date: {formattedDateMDY}</p>
      </div>
        <p>First Name: {firstName}</p>
        {isEditingFirstName ? (
          <div>
            <input
              type="text"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
            <button onClick={handleFirstNameChange}>Update</button>
            <button onClick={() => setIsEditingFirstName(false)}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setIsEditingFirstName(true)}>Edit</button>
        )}
      </div>
      <div>
        <p>Last Name: {lastName}</p>
        {isEditingLastName ? (
          <div>
            <input
              type="text"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
            />
            <button onClick={handleLastNameChange}>Update</button>
            <button onClick={() => setIsEditingLastName(false)}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setIsEditingLastName(true)}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;