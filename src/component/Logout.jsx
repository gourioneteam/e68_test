import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Logout() {
  const nav = useNavigate();

  const handleLogout = async () => {
    try {
      // optional: call backend logout to clear httpOnly cookie
      await api.post('/logout').catch(() => {});
    } finally {
      localStorage.removeItem('user');
      nav('/login', { replace: true });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
