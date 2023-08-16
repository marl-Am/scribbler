import { useContext } from "react";
import { formatCurrencyString } from "use-shopping-cart";

import Image from "next/image";
import { toast } from "react-toastify";
import { CartContext } from "~/context/CartContext";
import type { CartItem } from "~/context/CartContext";

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    currency: string;
    image: string;
    category: string;
    stock: number;
  };
}

export default function Product({ product }: ProductProps) {
  const { id, name, price, image } = product;

  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("Navbar must be used within a CartProvider");
  }
  const { cart, setCart } = cartContext;

  const isInCart = (product: CartItem) =>
    cart.some((item) => item.id === product.id);

  const addToCart = (product: CartItem) => {
    if (isInCart(product)) {
      toast.warn("Only one item is in stock.", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    setCart([...cart, product]);
    toast.success("Added To Cart: " + `${product.name}`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <article
      key={id}
      className="mb-6 flex flex-col gap-3 rounded-xl bg-white p-8 text-center shadow-md"
    >
      <Image
        src={image}
        className="text-3xl"
        alt={name}
        width={200}
        height={150}
      ></Image>
      <div className="text-md">{name}</div>
      <div className="mt-auto text-2xl font-semibold">
        {formatCurrencyString({ value: price, currency: "USD" })}
      </div>
      <button
        disabled={product.stock === 0}
        onClick={() => addToCart(product)}
        className="mx-5 -mb-4 flex justify-center rounded-full bg-emerald-600 p-2 text-white hover:bg-emerald-500 focus:bg-emerald-500 focus:outline-none"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      </button>
    </article>
  );
}
