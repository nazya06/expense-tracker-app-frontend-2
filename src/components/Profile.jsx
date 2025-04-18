// Profile.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // for redirect

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { currentUser, logout } = useAuth(); // Assuming you have a logout method
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProfile(data);
        setEmail(data.email); // prefill email field
      } catch (err) {
        console.error('Profile fetch error:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser]);

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put('/api/users/profile', { email }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setProfile(data);
      setMessage('✅ Profile updated');
    } catch (err) {
      console.error('Update error:', err.response?.data || err.message);
      setMessage('❌ Failed to update');
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
    if (!confirmed) return;

    try {
      await axios.delete('/api/users/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage('🗑️ Account deleted');
      logout(); // Clear auth state
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message);
      setMessage('❌ Failed to delete account');
    }
  };

  if (loading) return <div>Loading profile data...</div>;

  return (
    <div className="profile-page">
      <h2>👤 Your Profile</h2>

      {profile ? (
        <>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginLeft: '0.5rem' }}
            />
          </label>
          <br /><br />

          <button onClick={handleUpdate} style={{ marginRight: '1rem' }}>
            ✏️ Update Profile
          </button>

          <button onClick={handleDelete} style={{ background: 'red', color: 'white' }}>
            🗑️ Delete Account
          </button>

          {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
        </>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default Profile;
