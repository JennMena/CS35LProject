import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signup';
import HomePage from './components/homePage'; // Import the HomePage component
import HistoryPage from './components/historyPage/historyPage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              ExpenseTracker
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/home-page'}>
                    HomePage
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/history-page'}>
                    HistoryPage
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              {/* Add a new Route for the HomePage component */}
              <Route path="/home-page" element={<HomePage />} />
              <Route path="/history-page" element={<HistoryPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;