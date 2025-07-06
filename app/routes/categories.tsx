import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "~/components/Header";

interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
  category: string;
}

export default function Categories() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingIndex = cart.findIndex((item: any) => item.product._id === product._id);

    if (existingIndex !== -1) {
      // If already in cart, increase quantity
      cart[existingIndex].quantity += 1;
    } else {
      // Else add new item
      cart.push({ product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} added to cart`);
  };

  return (
    <div className="font-sans">
      {/* <Header /> */}
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-pink-600 font-bold mt-2">₹{product.price}</p>
                  <p className="text-sm text-gray-500 mb-3">{product.category}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
