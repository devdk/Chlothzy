import React, { useState } from "react";
import Header from "~/components/Header";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registered user:", res.data);
      alert("Registered successfully");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <div className="max-w-md mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border rounded px-4 py-2"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded px-4 py-2"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border rounded px-4 py-2"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full border rounded px-4 py-2"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
