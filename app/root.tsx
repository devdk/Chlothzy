import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "~/components/Header";
import Home from "~/routes/home";
import Categories from "~/routes/categories";
import Login from "~/routes/login";
import Register from "~/routes/register";
import CartPage from "~/routes/cart";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}
