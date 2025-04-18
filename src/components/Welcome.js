import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.scss'; // optional styling

const Welcome = () => (
  <div className="welcome-container">
    <h1>Welcome to BudgetBuddy 💰</h1>
    <p>Track your budgets, manage transactions, and take control of your finances.</p>
    <div className="welcome-actions">
      <Link to="/login" className="btn">Log In</Link>
      <Link to="/register" className="btn">Register</Link>
    </div>
  </div>
);

export default Welcome;
