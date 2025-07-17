import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

import { useAuthStore } from "../../store/auth.store";

const Signin = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  
  const signin = useAuthStore((state) => state.signin);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const handleLogin = async () => {
    if (!emailId || !password) return alert("All fields required");
    try {
      const logged = await signin({
        emailId,
        password,
      });
      // if (logged) {
      //   return navigate("/");
      // }
    } catch (err) {
      alert("Invalid email or password!");
      console.error("Signin failed", err);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full text-xl border px-4 py-2 rounded"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full text-xl border px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-purple-600 text-white text-xl py-2 rounded hover:bg-purple-700"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Please wait..." : "Sign In"}
        </button>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <p className="text-md text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Signin;
