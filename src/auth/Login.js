import React from 'react';
import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';
import './AuthLayout.scss';

const Login = () => (
  <div className="login-container">
    <div className="login-box">
      <h2>Логин</h2>
      <AuthForm type="login" />
      <Link to="/register" className="back-link">
        → Нет аккаунта? Регистрация
      </Link>
    </div>
  </div>
);

export default Login;
