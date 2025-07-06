// app/context/CartContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (_id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (_id: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
