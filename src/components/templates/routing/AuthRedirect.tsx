import React from "react";
import { useAuth } from "@/contexts";
import { Navigate } from "react-router-dom";

export const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AuthRedirect;
