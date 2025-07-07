import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between relative">
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
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
          >
            Shop Now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden px-3 py-2 border rounded text-gray-600 z-50"
        >
          ☰
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full right-4 mt-2 w-48 bg-white border rounded shadow-md flex flex-col items-end p-4 text-right md:hidden z-40">
            <Link to="/" onClick={toggleMobileMenu} className="mb-2 hover:text-pink-600">Home</Link>
            <Link to="/categories" onClick={toggleMobileMenu} className="mb-2 hover:text-pink-600">Categories</Link>
            <Link to="/cart" onClick={toggleMobileMenu} className="mb-2 hover:text-pink-600">Cart</Link>
            {isLoggedIn ? (
              <span className="mb-2 text-gray-700">Hi, {user?.name?.split(" ")[0] || "User"}</span>
            ) : (
              <>
                <Link to="/login" onClick={toggleMobileMenu} className="mb-2 hover:text-pink-600">Login</Link>
                <Link to="/register" onClick={toggleMobileMenu} className="mb-2 hover:text-pink-600">Register</Link>
              </>
            )}
            <Link
              to="/categories"
              onClick={toggleMobileMenu}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded w-full text-center mt-2"
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
