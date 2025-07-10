// app/routes/home.tsx
import React, { useEffect, useRef, useState } from "react";
import Header from "~/components/Header";
import { useCart } from "~/context/CartContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "~/utils/api";

const categories = [
  { id: 1, title: "All", value: "all", image: "https://source.unsplash.com/600x400/?fashion" },
  { id: 2, title: "Men", value: "men", image: "https://source.unsplash.com/600x400/?fashion,men" },
  { id: 3, title: "Women", value: "women", image: "https://source.unsplash.com/600x400/?fashion,women" },
  { id: 4, title: "Accessories", value: "accessories", image: "https://source.unsplash.com/600x400/?fashion,accessories" },
];

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const carouselRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase())
      );
    }
  }, [selectedCategory, products]);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="font-sans">
      {/* <Header /> */}

      {/* Hero Section */}
      <section
        className="h-[90vh] bg-cover bg-center relative flex items-center justify-center text-white text-center"
        style={{ backgroundImage: "url('/heroimg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Unleash Your Style</h1>
          <p className="text-base md:text-lg mb-6">Trendy Collections. Unbeatable Prices.</p>
          <Link
            to="/categories"
            className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition"
          >
            Shop Now
          </Link>
        </motion.div>
      </section>

      {/* Category Section */}
      <section className="py-14 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.value)}
              whileHover={{ scale: 1.03 }}
              className={`relative group overflow-hidden rounded-xl shadow hover:shadow-lg transition cursor-pointer border-2 ${
                selectedCategory === cat.value ? "border-blue-500" : "border-transparent"
              }`}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-52 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition flex items-end p-4">
                <h3 className="text-xl font-bold text-white">{cat.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-4">Style That Speaks</h2>
          <p className="text-lg mb-6">
            Discover outfits that define your vibe and set the trend. GenZ trend – only at Chlothzy.
          </p>
          <Link
            to="/categories"
            className="bg-white text-black px-6 py-3 rounded hover:bg-gray-100 transition"
          >
            Explore Collection
          </Link>
        </motion.div>
      </section>

      {/* Product Carousel */}
      <section className="py-14 bg-gray-50">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Featured Products</h2>
        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
          >
            ◀
          </button>
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto px-4 scrollbar-hide scroll-smooth"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.02 }}
                className="min-w-[250px] bg-white rounded-xl shadow-md hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600 mb-3">₹{product.price}</p>
                  <button
                    onClick={() => {
                      addToCart(product);
                      alert(`${product.name} has been added to the cart!`);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
          >
            ▶
          </button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-black text-white py-16 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Join Our Newsletter</h2>
        <p className="mb-6">Be the first to know about new arrivals and exclusive deals.</p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 text-black rounded"
          />
          <button type="submit" className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200">
            Subscribe
          </button>
        </form>
      </section>

      {/* Contact Section - Updated */}
      <section className="py-14 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <img
              src="/contactimg.jpg"
              alt="Contact"
              className="w-full h-auto rounded-lg shadow"
            />
          </div>
          <div className="md:w-1/2 text-right">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="mb-2">Email: okkdheeraj@gmail.com</p>
            <p className="mb-2">Phone: +91-7667116918</p>
            <p>Address: Gurgaon Sec 14</p>
          </div>
        </div>
      </section>

      {/* Static Section - After Contact */}
      <section className="py-20 px-6 bg-gradient-to-br from-black to-gray-800 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">Confidence in Every Thread</h2>
          <p className="text-lg mb-6">
            Each piece is crafted to inspire confidence and style. Make a statement without saying a word.
          </p>
          <Link
            to="/products"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded transition"
          >
            Shop Now
          </Link>
        </motion.div>
      </section>

      {/* Sticky Buy Now Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-pink-500 text-white text-center py-3 px-4 shadow-md z-50">
        <button className="w-full font-semibold text-lg">Buy Now</button>
      </div>
    </div>
  );
}
