import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>404</h1>
      <p style={textStyle}>Упс! Страница не найдена</p>
      <Link to="/" style={buttonStyle}>
        Вернуться назад
      </Link>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '70vh',
  textAlign: 'center',
  padding: '20px'
};

const titleStyle = {
  fontSize: '2.5rem',
  color: '#e74c3c',
  marginBottom: '20px'
};

const textStyle = {
  fontSize: '1.2rem',
  marginBottom: '30px',
  color: '#7f8c8d'
};

const buttonStyle = {
  padding: '12px 24px',
  backgroundColor: '#3498db',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  fontWeight: 'bold',
  transition: 'all 0.3s ease'
};

export default NotFound;