import { useEffect, useState } from "react";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config/config";
import axios from "axios";
const SignUp = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignUp = async () => {
    try {
      if (!emailId || !password) return alert("All feilds are required");
      // console.log(BACKEND_URL + "/api/v1/signup");

      const res = await axios.post(
        BACKEND_URL + "/api/v1/signup",
        { emailId, password },
        {
          withCredentials: true,
        }
      );
      console.log(res?.data);

      alert("SignUp successful");
      navigate("/");
    } catch (err) {
      console.error("SignUp failed", err);
    }
  };
  const checkAuth = async () => {
    try {
      await axios.get(`${BACKEND_URL}/api/v1/profile`, {
        withCredentials: true,
      });
      navigate("/"); // Already logged in -> go to home
    } catch (err) {
      console.error("err message :", err);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <AuthLayout>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="emailId"
          value={emailId}
          className="w-full border px-4 py-2 text-xl rounded-md"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          className="w-full border px-4 py-2 text-xl rounded-md"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-purple-600 text-white text-xl py-2 rounded hover:bg-purple-700"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <p className="text-md text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-purple-600 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
