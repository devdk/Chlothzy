// app/routes/categories.tsx
import React, { useEffect, useState } from "react";
import Header from "~/components/Header";
import api from "~/utils/api";
import { useCart } from "~/context/CartContext";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function Categories() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get("/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="font-sans">
      <Header />
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.02 }}
                className="rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-pink-600 font-bold mt-2">₹{product.price}</p>
                  <p className="text-sm text-gray-500 mb-4 capitalize">{product.category}</p>
                  <button
                    onClick={() => {
                      addToCart(product);
                      alert(`${product.name} added to cart`);
                    }}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
