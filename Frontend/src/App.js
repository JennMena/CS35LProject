/*import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/login';
import SignUp from './components/signup';
import HomePage from './components/homePage';
import HistoryPage from './components/historyPage/historyPage';
import ProfilePage from './components/profilePage';
import CategoriesPage from './components/categoriesPage/categoriesPage';
import Modal from 'react-modal';
import About from './components/about';
import Logout from './components/logout';
import SettingsPage from './components/settingsPage';

function App() {
 const [modalIsOpen, setModalIsOpen] = useState(false);

 const openModal = () => {
   setModalIsOpen(true);
 };

 const closeModal = () => {
   setModalIsOpen(false);
 };

 return (
   <Router>
     <div className="App">
       <nav className="navbar navbar-expand-lg navbar-light fixed-top">
         <div className="container">
           <Link className="navbar-brand" to={'/sign-in'}>
             ExpenseTracker!
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
                   Home Page
                 </Link>
               </li>
               <li className="nav-item">
                 <Link className="nav-link" to={'/history-page'}>
                   History Page
                 </Link>
               </li>
               <li className="nav-item">
                 <Link className="nav-link" to={'/category-page'}>
                   My Categories
                 </Link>
               </li>
               <li className="nav-item">
                 <Link className="nav-link" to={'/about-page'}>
                   About
                 </Link>
               </li>
               <li className="nav-item">
                 <button className="nav-link btn" onClick={openModal}>
                   Profile
                 </button>
               </li>
               <li className="nav-item">
                 <Link className="nav-link" to={'/settings-page'}>
                   Settings
                 </Link>
                 </li>
               <li className="nav-item">
                 <Link className="nav-link" to={'/logout-page'}>
                   Logout
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
             <Route path="/home-page" element={<HomePage />} />
             <Route path="/history-page" element={<HistoryPage />} />
             <Route path="/category-page" element={<CategoriesPage />} />
             <Route path="/about-page" element={<About />} />
             <Route path="/settings-page" element={<SettingsPage />} />
             <Route
               path="/profile-page"
               element={<ProfilePage modalIsOpen={modalIsOpen} closeModal={closeModal} />}
             />
             <Route path="/logout-page" element={<Logout />} />
           </Routes>
         </div>
       </div>
     </div>
     <Modal
       isOpen={modalIsOpen}
       onRequestClose={closeModal}
       contentLabel="Profile Information"
       style={{
         content: {
           top: '50%',
           left: '50%',
           right: 'auto',
           bottom: 'auto',
           marginRight: '-50%',
           transform: 'translate(-50%,-50%)',
         },
       }}
     >
       <ProfilePage modalIsOpen={modalIsOpen} closeModal={closeModal} />
     </Modal>
   </Router>
 );
}


export default App;

*/

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/login';
import SignUp from './components/signup';
import HomePage from './components/homePage';
import HistoryPage from './components/historyPage/historyPage';
import ProfilePage from './components/profilePage';
import CategoriesPage from './components/categoriesPage/categoriesPage';
import Modal from 'react-modal';
import About from './components/about';
import Logout from './components/logout';
import SettingsPage from './components/settingsPage';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              ExpenseTracker!
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                {!isAuthenticated ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/home-page'}>
                        Home Page
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/history-page'}>
                        History Page
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/category-page'}>
                        My Categories
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/about-page'}>
                        About
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link btn" onClick={openModal}>
                        Profile
                      </button>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/settings-page'}>
                        Settings
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/logout-page'}>
                        Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/sign-in" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/home-page" element={<HomePage />} />
              <Route path="/history-page" element={<HistoryPage />} />
              <Route path="/category-page" element={<CategoriesPage />} />
              <Route path="/about-page" element={<About />} />
              <Route path="/settings-page" element={<SettingsPage />} />
              <Route
                path="/profile-page"
                element={<ProfilePage modalIsOpen={modalIsOpen} closeModal={closeModal} />}
              />
              <Route path="/logout-page" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
            </Routes>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Profile Information"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%,-50%)',
          },
        }}
      >
        <ProfilePage modalIsOpen={modalIsOpen} closeModal={closeModal} />
      </Modal>
    </Router>
  );
}

export default App;