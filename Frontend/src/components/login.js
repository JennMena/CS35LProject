import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignInForm = () => {
  const backendAPI = "http://localhost:3001/";
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
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


    console.log('Form submitted:', requestData); // Debug log


    // Make the HTTP request
    axios.post(backendAPI + 'login', requestData)
      .then((response) => {
        console.log('Success:', response.data);
        if (response.data.existe) {
          // Redirect to home page on successful login
          navigate('/home-page');
        } else {
          // Handle login failure
          setErrorMessage('Login failed. Please check your credentials and try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Login failed. Please check your credentials and try again.');
      });
  };


  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign In</h3>
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
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            name="rememberMe"
            className="custom-control-input"
            id="customCheck1"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
      )}
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
      <p className="forgot-password text-right">
        Not yet registered? <a href="/sign-up">Create an account here.</a>
      </p>
    </form>
  );
};


export default SignInForm;
