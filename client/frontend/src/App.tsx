import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { useAuthStore } from "./store/auth.store";
import { useEffect } from "react";

const App = () => {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  // const loading = useAuthStore((s) => s.loading);
  useEffect(() => {
    fetchUser();
  }, []);
  // if (loading) return <div className="text-2xl text-center">Loading...</div>;
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;
