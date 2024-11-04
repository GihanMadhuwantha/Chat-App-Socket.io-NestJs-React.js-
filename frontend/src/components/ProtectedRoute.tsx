import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("access_token"); // Check if the access token exists

  // If token is not present, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists, render the protected component (e.g., Chat)
  return children;
};

export default ProtectedRoute;
