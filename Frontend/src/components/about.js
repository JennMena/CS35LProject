import React from 'react';
import Shivani from '../images/Shivani.jpg';
import Quinn from '../images/Quinn.jpeg';
import Jenn from '../images/Jenn.jpeg';

const About = () => {
  const aboutStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    color: '#333',
    backgroundColor: '#f7f7f7',
    padding: '40px 20px',
    fontFamily: '"Arial", sans-serif'
  };

  const headerStyle = {
    fontSize: '2.5rem',
    marginBottom: '20px'
  };

  const paragraphStyle = {
    fontSize: '1.2rem',
    marginBottom: '20px',
    lineHeight: '1.6'
  };

  const teamListStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: '20px 0',
    fontSize: '1.2rem'
  };

  const teamMemberStyle = {
    marginBottom: '10px'
  };

  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px'
  };

  const imageStyle = {
    width: '175px',
    height: '200px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div style={aboutStyle}>
      <h1 style={headerStyle}>About Us!</h1>
      <p style={paragraphStyle}>What is ExpenseTracker?</p>
      <p style={paragraphStyle}>
        Built for UCLA's CS35L Spring '24 using React.js and SQL,<br />
        <span style={{ fontWeight: 'bold' }}>ExpenseTracker!</span> is an interactive full stack finance-tracking application for all your budgeting needs.
      </p>

      <p style={paragraphStyle}>Created by ...</p>
      <ul style={teamListStyle}>
        <li style={teamMemberStyle}>Shivani Kolla</li>
        <li style={teamMemberStyle}>Quinn McCall</li>
        <li style={teamMemberStyle}>Jenn Mena</li>
        <li style={teamMemberStyle}>Samyukhtha Rajkumar Sridevi</li>
      </ul>
      <div style={imageContainerStyle}>
        <img src={Shivani} alt="Shivani" style={imageStyle} />
        <img src={Quinn} alt="Quinn" style={imageStyle} />
        <img src={Jenn} alt="Jenn" style={imageStyle} />
      </div>
    </div>
  );
};

export default About;
