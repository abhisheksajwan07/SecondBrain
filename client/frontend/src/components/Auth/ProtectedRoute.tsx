import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const fetchUser = useAuthStore((state)=>state.fetchUser)
  const isAuthenticated = useAuthStore((state)=>state.isAuthenticated)
  
  useEffect(() => {
    fetchUser();
  }, []);
  if (isAuthenticated === null)
    return <div className="flex justify-center  text-3xl ">Loading...</div>;
  if (isAuthenticated === false) return <Navigate to="/signup" replace />;
  return children;
};
