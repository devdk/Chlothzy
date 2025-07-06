import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (err) {
        console.error("Invalid user data in localStorage");
      }
    }
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-pink-600">
          Clothzy
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700 items-center">
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/cart">Cart</Link>

          {isLoggedIn ? (
            <span className="text-gray-700">
              Hi, {user?.name?.split(" ")[0] || "User"}
            </span>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          <Link
            to="/categories"
            className="hidden md:inline-block bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
          >
            Shop Now
          </Link>
        </nav>

        {/* Mobile Menu Button (optional) */}
        <button className="md:hidden px-2 py-1 border rounded text-gray-600">
          ☰
        </button>
      </div>
    </header>
  );
}
