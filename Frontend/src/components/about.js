import React from 'react';

import Shivani from '../images/Shivani.jpg';

const About = () => {
  const aboutStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    color: '#333',
    backgroundColor: '#f7f7f7',
    padding: '20px',
    fontFamily: '"Arial", sans-serif'
  };

  return (
    <div style={aboutStyle}>
      <h1>About Us</h1>
      <p>Welcome to ExpenseTracker!</p>
      <img src={Shivani} className="shivani-headshot" alt="Shivani" style={{ width: '100px', height: '100px' }}/>
    </div>
  );
};

export default About;

