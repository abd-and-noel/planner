import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../../utils/isAuthenticated';

const UnauthenticatedRoute = ({ children }) => {
  return isTokenValid() ? <Navigate to="/dashboard" replace /> : children;
};

export default UnauthenticatedRoute;
