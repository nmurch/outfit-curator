import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, element }) => {
  if (user === null) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
