import axios from 'axios';

export const getCurrentUser = async () => {
  try {
    const response = await axios.get('/users/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch user' };
  }
};

export const register = async ({ name, email, password }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', { 
      email,
      password, });

    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data.user; 
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};


export const changePassword = async ({ currentPassword, newPassword }) => {
  const res = await fetch('/api/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ currentPassword, newPassword })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error changing password');
  }

  return await res.json();
};
