import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Register from './component/Register';
import Login from './component/Login';
import Profile from './component/Profile';
import AdminDashboard from './component/AdminDashboard';
import CommonDashboard from './component/CommonDashboard';
import ProtectedRoute from './component/ProtectedRoute';
import Logout from './component/Logout';

function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          backgroundColor: '#282c34',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px'
        }}
      >
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
        <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
        <Link to="/logout" style={{ color: 'white', textDecoration: 'none' }}>Logout</Link>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin dashboard could be protected too if desired */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/common"
          element={
            <ProtectedRoute roles={['admin', 'student']}>
              <CommonDashboard />
            </ProtectedRoute>
          }
        />

        {/* Profile is viewable only by admin */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute roles={['admin']}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<div style={{ padding: 20 }}>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
