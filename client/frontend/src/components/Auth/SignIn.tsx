import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

const Signin = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!emailId || !password) return alert("All fields required");

    alert("Login successful!");
    navigate("/");
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
        >
          Sign In
        </button>
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
