import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, changePassword } from '../services/authService';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const { currentPassword, newPassword, confirmNewPassword } = passwords;

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword });
      setMessage('Password changed successfully!');
      setPasswords({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (err) {
      setError(err.message || 'Failed to change password.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1>Your Profile</h1>
      {user && (
        <div style={styles.profileInfo}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      )}

      <h2>Change Password</h2>
      <form onSubmit={handlePasswordChange} style={styles.form}>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={passwords.currentPassword}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={passwords.newPassword}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          value={passwords.confirmNewPassword}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.changeButton}>Change Password</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button 
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}
        style={styles.logoutButton}
      >
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  profileInfo: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    margin: '20px 0'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
    padding: '10px',
    fontSize: '16px'
  },
  changeButton: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  }
};

export default Profile;
