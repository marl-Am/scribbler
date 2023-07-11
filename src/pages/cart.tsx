import React from "react";
import { useCart } from "~/context/CartContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useCart();

  // Calculate total sum
  const totalSum = cart.reduce((sum, product) => sum + product.price, 0);
  return (
    <div className="mb-24 mt-24 justify-center text-black">
      <h1 className="text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center">No items in cart.</p>
      ) : (
        <>
          <p className="text-center">Total: ${totalSum}</p>
          {cart.map((product) => (
            <div
              key={product.id}
              className="mb-4 mt-4 flex justify-center gap-4"
            >
              <p>{product.name}</p>
              <p>{product.price}</p>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width="50"
                height="50"
                loading="lazy"
              />
              <button
                onClick={() => removeFromCart(product.id)}
                className="rounded-lg bg-red-500 px-4 py-2 text-white transition duration-200 hover:bg-red-700"
              >
                Delete <FontAwesomeIcon icon={faTrash} className="ml-1" />
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Cart;