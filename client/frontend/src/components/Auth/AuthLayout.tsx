import { useEffect } from "react";
import { useAuthStore } from "../../store/auth.store";
import { Navigate, useNavigate } from "react-router-dom";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const loading = useAuthStore((s) => s.loading);
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Already logged in
    }
  }, [isAuthenticated]);
  if (loading) return <div className="text-2xl text-center">Loading...</div>;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-purple-600 mb-6">
          Welcome to SecondBrain
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
