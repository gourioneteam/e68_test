import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(!user);
  const [error, setError] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get('/profile'); // requires backend auth middleware
        const serverUser = res?.data?.user;
        if (serverUser) {
          setUser(serverUser);
          localStorage.setItem('user', JSON.stringify(serverUser));
        } else {
          setError('No user data returned from server.');
          localStorage.removeItem('user');
        }
      } catch (err) {
        const status = err?.response?.status;
        const msg = err?.response?.data?.message || err.message || 'Failed to fetch profile';
        setError(msg);
        console.error('Profile fetch error:', err);

        if (status === 401 || status === 403) {
          localStorage.removeItem('user');
          nav('/login', { replace: true });
        }
      } finally {
        setLoading(false);
      }
    };

    // Refresh profile from server on mount
    fetchProfile();
  }, [nav]);

  if (loading) return <div style={{ padding: 20 }}>Loading profile...</div>;
  if (error) return <div style={{ color: 'red', padding: 20 }}>{error}</div>;
  if (!user) return <div style={{ padding: 20 }}>No profile available.</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Profile Details</h2>
      <div style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8, maxWidth: 600 }}>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.usertype}</p>
      </div>
    </div>
  );
}

export default Profile;
