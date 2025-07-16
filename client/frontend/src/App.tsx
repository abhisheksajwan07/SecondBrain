import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { useAuthStore } from "./store/auth.store";
import { useEffect } from "react";

const App = () => {
  const { fetchUser, loading, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
