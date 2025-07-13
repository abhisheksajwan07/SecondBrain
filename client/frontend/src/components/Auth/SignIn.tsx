import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { BACKEND_URL } from "../config/config";
import axios from "axios";

const Signin = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!emailId || !password) return alert("All fields required");
    try {
      const res = await axios.post(
        BACKEND_URL + "/api/v1/signin",
        { emailId, password },
        {
          withCredentials: true,
        }
      );
      console.log(res?.data);

      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Signin failed", err);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(BACKEND_URL + "/api/v1/profile", {
          withCredentials: true,
        });
        navigate("/"); // Already logged in -> go to home
      } catch (err) {
        console.error("err message :", err);
      }
    };
    checkAuth();
  }, []);

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
