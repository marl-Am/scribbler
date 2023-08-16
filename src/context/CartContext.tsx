import React, { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import Cookies from "js-cookie";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  removeItemFromCart: (itemId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = Cookies.get("cart");

    if (savedCart) {
      const parsedCart = JSON.parse(savedCart) as CartItem[];

      if (Array.isArray(parsedCart) && parsedCart.length > 0) {
        setCart(parsedCart);
      }
    }
  }, []);

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cart));
  }, [cart]);

  const removeItemFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    console.log("Clearing the cart");
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, removeItemFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
