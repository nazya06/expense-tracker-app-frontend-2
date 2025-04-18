import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import '../styles/Header.css'; 

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            {/* <img src="/logo.svg" alt="Expense Tracker Logo" className="logo" /> */}
            <span className="app-name">Expense Tracker</span>
          </Link>
        </div>
        
        <nav className="main-nav">
          <ul className="nav-list">
            {currentUser ? (
              <>
               <li className="nav-item">
                  <Link to="/" className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/transactions" className="nav-link">Transactions</Link>
                </li>
                <li className="nav-item">
                  <Link to="/budgets" className="nav-link">Budgets</Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">Profile</Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="logout-button">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Логин</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Регистрация</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;