import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './settingsPage.css'

const backendAPI = "http://localhost:3001/";

const SettingsPage = () => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName'));
  const [lastName, setLastName] = useState(localStorage.getItem('lastName'));
  const [registrationDate, setRegistrationDate] = useState(localStorage.getItem('registrationDate'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [password, setPassword] = useState('');
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
          setPassword('');  // Do not store password in local storage for security reasons
          localStorage.setItem('userId', response.data.id);
          localStorage.setItem('firstName', response.data.firstName);
          localStorage.setItem('lastName', response.data.lastName);
          localStorage.setItem('registrationDate', response.data.registrationDate);
          localStorage.setItem('username', response.data.username);
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

  const handleFirstNameChange = async () => {
    try {
      const response = await axios.put(
        `${backendAPI}users/${userId}`, 
        { firstName }, 
        { withCredentials: true }
      );
      setFirstName(response.data.user.firstName);
      localStorage.setItem('firstName', response.data.user.firstName);
      setIsEditingFirstName(false);
    } catch (error) {
      console.error('Error updating first name:', error);
    }
  };

  const handleLastNameChange = async () => {
    try {
      const response = await axios.put(
        `${backendAPI}users/${userId}`, 
        { lastName }, 
        { withCredentials: true }
      );
      setLastName(response.data.user.lastName);
      localStorage.setItem('lastName', response.data.user.lastName);
      setIsEditingLastName(false);
    } catch (error) {
      console.error('Error updating last name:', error);
    }
  };
  const handlePasswordChange = async () => {
    try {
      const response = await axios.put(
        `${backendAPI}users/${userId}`, 
        { password }, 
        { withCredentials: true }
      );
      setPassword(response.data.user.password);
      setIsEditingPassword(false);
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleEditFirstName = () => {
    setIsEditingFirstName(true);
  };

  const handleEditLastName = () => {
    setIsEditingLastName(true);
  };

  const handleEditPassword = () => {
    setIsEditingPassword(true);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const formattedDate = new Date(registrationDate).toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

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
        <p>Registration Date: {formattedDate}</p>
      </div>
      <div>
        <p>First Name: {firstName}</p>
        {isEditingFirstName ? (
          <div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <button onClick={() => { handleFirstNameChange(); setIsEditingFirstName(false); }}>Update</button>
            <button onClick={() => {setIsEditingFirstName(false); window.location.reload();}}>Cancel</button>
          </div>
        ) : (
          <button onClick={handleEditFirstName}>Edit</button>
        )}
      </div>
      <div>
        <p>Last Name: {lastName}</p>
        {isEditingLastName ? (
          <div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <button onClick={() => { handleLastNameChange(); setIsEditingLastName(false); }}>Update</button>
            <button onClick={() => {setIsEditingLastName(false); window.location.reload();}}>Cancel</button>
          </div>
        ) : (
          <button onClick={handleEditLastName}>Edit</button>
        )}
      </div>
      <div>
        <p>Password: *******</p>
        {isEditingPassword ? (
          <div>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={togglePasswordVisibility}>
              {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
            </button>
            <button onClick={() => { handlePasswordChange(); setIsEditingPassword(false); }}>Update</button>
            <button onClick={() => {setIsEditingPassword(false); window.location.reload();}}>Cancel</button>
          </div>
        ) : (
          <button onClick={handleEditPassword}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;