// src/Components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // If user does not have the required role, redirect to home or an unauthorized page
    return <Navigate to="/" replace />;
  }

  // If authenticated and has the required role, render the children components
  return children;
};

export default ProtectedRoute;
