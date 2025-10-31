import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Login() {
  const [formdata, setFormdata] = useState({ email: '', username: '', password: '' });
  const [error, setError] = useState('');
  const nav = useNavigate();

  const handle = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('https://e68-test-backend.vercel.app/api/login', formdata);
      const user = res?.data?.user;

      if (!user) {
        setError('Login failed: server did not return user info.');
        return;
      }

      // store minimal safe user info for frontend checks
      localStorage.setItem('user', JSON.stringify(user));

      // navigate based on role
      if (user.usertype === 'admin') nav('/admin', { replace: true });
      else nav('/common', { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Login failed';
      setError(msg);
      console.error('Login error:', err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
      <form onSubmit={submit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formdata.email}
          onChange={handle}
          required
        />
        <br /><br />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formdata.username}
          onChange={handle}
        />
        <br /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formdata.password}
          onChange={handle}
          required
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
