import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.jsx';

const ProtectedRoute = ({ children, requireProfile }) => {
  const { isAuthenticated, hasProfile } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireProfile && !hasProfile) {
    return <Navigate to="/create-profile" />;
  }

  if (!requireProfile && hasProfile) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;