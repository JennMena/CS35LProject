import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory

const SignUpForm = () => {
  const backendAPI = "http://localhost:3001/";
  const navigate = useNavigate(); // Use useHistory hook

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Prepare the data to match the backend API requirements
    const requestData = {
      username: formData.email,
      password: formData.password,
    };

    // Prepare the data to match the backend API requirements
    const requestDataForUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.email,
      password: formData.password,
      locationCityId: 1,
      address: "123 Main St",
      locationCityId: 1,
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      birthDate: "1990-01-01",
      gender: "M",
      registrationDate: "2023-01-01",
      enabled: true
    };

    //console.log('Form submitted:', requestData); // Debug log

    // Make the HTTP request
    axios.post(backendAPI + 'login', requestData)
      .then((response) => {
        console.log('Success:', response.data);
        if (response.data.existe) {
          // Redirect to home page on successful login
          setErrorMessage('This email and password already exist. Please use different credentials.');
        } 
        else {
          axios.post(backendAPI + 'users', requestDataForUser)
            .then((response) => {
              console.log('Success:', response.data);
              if (response.data) {
                navigate('/sign-in');
              } else {
                // Need to create the user in the backend
                setErrorMessage('The account was unable to be created. Try again later.');
              }
            })
            .catch((error) => {
              console.error('Error:', error);
              setErrorMessage('Could not create user. Please try again later.');
            });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Failed to create user. Please try again later.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          name="firstName"
          className="form-control"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          name="lastName"
          className="form-control"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
      )}
      <p className="forgot-password text-right">
        Already registered? <a href="/sign-in">Sign in here.</a>
      </p>
    </form>
  );
};

export default SignUpForm;