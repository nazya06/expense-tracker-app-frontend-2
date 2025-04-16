// src/auth/AuthForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/authService';

const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authFunction = type === 'login' ? login : register;
      await authFunction(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {type === 'register' && (
        <input
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Name"
          required
        />
      )}
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="Email"
        required
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        placeholder="Password"
        required
        minLength={6}
      />
      <button type="submit">
        {type === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;