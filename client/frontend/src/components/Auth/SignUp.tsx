import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignUp = () => {
    if (!email || !password) return alert("All feilds are required");
    alert("SignUp successful");
    navigate("/");
  };
  return (
    <AuthLayout>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="email"
          value={email}
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
