import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "~/components/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showWelcome, setShowWelcome] = useState(false); // ✅
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setShowWelcome(true); // ✅ show welcome message

        setTimeout(() => {
          navigate("/"); // ✅ redirect after short delay
        }, 2000);
      } else {
        setError("Invalid credentials");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      {/* <Header /> */}

      {showWelcome && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50">
          👋 Welcome back!
        </div>
      )}

      <div className="max-w-md mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
