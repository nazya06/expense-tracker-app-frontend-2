
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import styles from '../styles/ProfilePage.module.scss';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { currentUser, logout } = useAuth(); 
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
        setEmail(data.email);
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
      setMessage('Профиль обновлен');
    } catch (err) {
      console.error('Update error:', err.response?.data || err.message);
      setMessage('Ошибка');
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
      setMessage('Account deleted');
      logout(); 
      navigate('/login'); 
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message);
      setMessage('❌ Failed to delete account');
    }
  };

  if (loading) return <div className={styles.profileContainer}>Загрузка...</div>;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <h2 className={styles.name}>👤 Профиль</h2>

        {profile ? (
          <>
            <label className={styles.label}>
              Email: 
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <div className={styles.buttonGroup}>
              <button className={styles.updateButton} onClick={handleUpdate}>
                Изменить
              </button>

              <button className={styles.deleteButton} onClick={handleDelete}>
                Удалить профиль
              </button>
            </div>

            {message && <p className={styles.message}>{message}</p>}
          </>
        ) : (
          <p>Нет данных</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
