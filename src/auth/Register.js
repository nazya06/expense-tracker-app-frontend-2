// src/auth/Register.js
import React from 'react';
import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';
import './AuthLayout.scss';

const Register = () => (
  <div className="register-container">
    <div className="register-box">
      <h2>Register</h2>
      <AuthForm type="register" />
      <Link to="/" className="back-link">
        ← Back to Dashboard
      </Link>
    </div>
  </div>
);

export default Register;

