import React from "react";
import { useCart } from "~/context/CartContext";

export default function CartPage() {
  const { cartItems } = useCart();

  console.log("Cart Page Items:", cartItems); // 👈 Add this

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item._id} className="mb-4 p-4 border rounded">
              <img src={item.image} alt={item.name} className="h-20 w-20 object-cover mb-2" />
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p>₹{item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
