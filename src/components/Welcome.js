import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.scss'; // optional styling

const Welcome = () => (
  <div className="welcome-container">
    <h1>Добро пожаловать в Expense Tracker</h1>
    <p>Войдите или зарегистрируйтесь</p>
    <div className="welcome-actions">
      <Link to="/login" className="btn">Логин</Link>
      <Link to="/register" className="btn">Регистрация</Link>
    </div>
  </div>
);

export default Welcome;
