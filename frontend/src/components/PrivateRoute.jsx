import React from 'react';
import { Navigate } from 'react-router-dom';

const getAuthToken = () => {
    const token = localStorage.getItem("auth_token");
    const expiration = localStorage.getItem("auth_token_expiration");
  
    if (!token || !expiration) {
      return null;
    }
  
    const now = new Date();
    if (now.getTime() > expiration) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_token_expiration");
      return null;
    }
  
    return token;
  };

const PrivateRoute = ({ children }) => {
    const authToken = getAuthToken();
    return authToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
