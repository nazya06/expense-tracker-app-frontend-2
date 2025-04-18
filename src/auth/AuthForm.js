// src/auth/AuthForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const AuthForm = ({ type }) => {
  
  const [formData, setFormData] = useState({ email: '', password: ''});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();


  const { login, register } = useAuth(); // <-- include register

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === 'login') {
        await login({ email: formData.email, password: formData.password });
        navigate('/');
      } else {
        await register({
          email: formData.email,
          password: formData.password,
          // name: formData.username, 
        });
        navigate('/');
      }
      
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };
  
  

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input name="email" type="email" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input name="password" type="password" onChange={handleChange} required />
      </div>
      <button type="submit">{type === 'login' ? 'Login' : 'Register'}</button>
    </form>
  );
};

export default AuthForm;
