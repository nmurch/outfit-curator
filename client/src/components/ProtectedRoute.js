import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element }) => {
  const { auth } = useContext(AuthContext);

  if (auth === null) {
    return <div>Loading...</div>;
  }

  return auth ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
