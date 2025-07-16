import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../config/config";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const checkAuth = async () => {
    try {
      await axios.get(`${BACKEND_URL}/api/v1/profile`, {
        withCredentials: true,
      });
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  if (isAuthenticated === null)
    return <div className="flex justify-center items center tex-3xl items-center">Loading...</div>;
  if (isAuthenticated === false) return <Navigate to="/signup" replace />;
  return children;
};
