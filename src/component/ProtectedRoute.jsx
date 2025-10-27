import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, roles = [] }) {
  const raw = localStorage.getItem('user');
  const user = raw ? JSON.parse(raw) : null;

  // If not logged in -> redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // If roles are specified and user's role is not allowed -> redirect
  if (roles && roles.length > 0 && !roles.includes(user.usertype)) {
    return <Navigate to="/login" replace />;
  }

  // Allowed
  return children;
}

export default ProtectedRoute;
