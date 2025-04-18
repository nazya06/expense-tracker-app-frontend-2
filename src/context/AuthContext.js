
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = useCallback(async () => {
    try {
      const response = await axios.get('/api/users/profile');
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      }
      throw error;
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get('/api/users/profile');
      setCurrentUser(data);
    } catch (err) {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);



  const checkAuthState = useCallback(async () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [getCurrentUser]);

  useEffect(() => {
    // Configure axios defaults once
    axios.defaults.baseURL = 'http://localhost:5000/';
    
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // Check authentication state
    checkAuthState();
  }, [checkAuthState]);

  const register = async ({ name, email, password }) => {
    try {
      const response = await axios.post('/api/auth/register', { 
        // username: name,
        email,
        password
      });
      
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setCurrentUser(response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  };
  
  const login = async ({ email, password }) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setCurrentUser(response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  };
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
  };

  const changePassword = async ({ currentPassword, newPassword }) => {
    try {
      const response = await axios.post('/api/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Error changing password';
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await axios.get('/api/users/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  };
  
  const updateUserProfile = async (profileData) => {
    try {
      const response = await axios.put('/api/users/profile', profileData);
      setCurrentUser(response.data); // Update context with new data
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  };
  
  const deleteUserProfile = async () => {
    try {
      await axios.delete('/api/users/profile');
      logout(); // Clear auth state
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete profile' };
    }
  };

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout,
    changePassword,
    checkAuthState
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
