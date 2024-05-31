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
      <h1>About Us!</h1>
      <p>What is ExpenseTracker?</p>
      <p>
                    Built for UCLA's CS35L Spring '24 using React.js and SQL,<br />
                    <span className="inlinebudget">ExpenseTracker!</span> is an interactive full stack finance-tracking application for all your budgeting needs. <br />
                </p>

      <p>Created by ...</p>
      <li>
         Shivani Kolla
      </li>
      <li>
         Quinn McCall
      </li>
      <li>
         Jenn Mena
      </li>
      <li>
         Samyukhtha Rajkumar Sridevi
      </li>
      <img src={Shivani} className="shivani-headshot" alt="Shivani" style={{ width: '175px', height: '200px' }}/>
    </div>
  );
};

export default About;

