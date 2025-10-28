import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If route requires admin access
  if (adminOnly) {
    const userStr = localStorage.getItem('user');
    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'admin') {
        return <Navigate to="/portfolio" replace />;
      }
    } catch (e) {
      return <Navigate to="/portfolio" replace />;
    }
  }
  
  return children;
};

export default ProtectedRoute;