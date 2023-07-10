import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

// Define the shape of a product object
type Product = {
  id: number;
  name: string;
  price: number;
  shortDescription: string;
  imageUrl: string;
  stock: number;
};

// Define the shape of the context
type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void; // Add this line
};

// Create a context with an empty default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a custom hook that components can use to access the cart
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

// Create a provider component that components can use to update the cart
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  function addToCart(product: Product) {
    setCart((prevCart) => [...prevCart, product]);
  }

  function removeFromCart(productId: number) {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId)
    );
  }

  // The value passed to CartContext.Provider will be available to all components
  // that use the `useCart` hook
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
