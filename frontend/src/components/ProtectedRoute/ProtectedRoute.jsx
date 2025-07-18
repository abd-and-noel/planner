import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../../utils/isAuthenticated';

const ProtectedRoute = ({ children }) => {
  return isTokenValid() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;