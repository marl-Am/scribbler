import React from "react";
import { useCart } from "~/context/CartContext";


import Image from "next/image";
import Head from "next/head";

import Link from "next/link";

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useCart();

  // Calculate total sum
  const totalSum = cart
    .reduce((sum, product) => sum + product.price, 0)
    .toFixed(2);
  const SHIPPING_CHARGE = 10.5;
  const FINAL_PRICE = (parseFloat(totalSum) + SHIPPING_CHARGE).toFixed(2);

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      {/*  */}
      <div className="cartPage">
        <div>
          {cart.length === 0 ? (
            <div className="flex min-h-screen flex-col items-center justify-center">
              <p className="mt-2 text-3xl text-black">Your cart is empty.</p>
            </div>
          ) : (
            <div className="bg-gray-100">
              <div className="container mx-auto mt-10">
                {/*  */}
                <div className="my-10 shadow-md">
                  {/*  */}

                  <div
                    className="w-3/4 bg-white px-10 py-10"
                    id="shopping-cart"
                  >
                    <div className="flex justify-between border-b pb-8">
                      <h1 className="text-2xl font-semibold">Shopping Cart</h1>
                      <h2 className="text-2xl font-semibold">
                        {cart.length} Items
                      </h2>
                    </div>
                    <div className="details-font mb-5 mt-10 flex">
                      <h3 className="w-2/5 text-xs font-semibold uppercase text-gray-600">
                        Product&nbsp;Details
                      </h3>
                      <h3 className="w-1/5 text-center text-xs font-semibold uppercase text-gray-600">
                        Quantity
                      </h3>
                      <h3 className="w-1/5 text-center text-xs font-semibold uppercase text-gray-600">
                        Price
                      </h3>
                      <h3 className="w-1/5 text-center text-xs font-semibold uppercase text-gray-600">
                        Total
                      </h3>
                    </div>

                    {cart.map((product) => (
                      <div
                        key={product.id}
                        className="-mx-8 flex items-center px-6 py-5 hover:bg-gray-100"
                      >
                        <div className="flex w-2/5">
                          <div className="w-20">
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              width="100"
                              height="100"
                              loading="lazy"
                            />
                          </div>
                          <div className="ml-4 flex flex-grow flex-col justify-between">
                            <span className="product-name text-sm font-bold">
                              {product.name}
                            </span>
                            {/* <span className="text-xs text-red-500">
                            Brand Name
                          </span> */}
                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="text-md font-semibold text-gray-500 hover:text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="flex w-1/5 justify-center">
                          <span className="mx-2 w-8 border text-center">1</span>
                        </div>
                        <span className="w-1/5 text-center text-sm font-semibold">
                          {product.price}
                        </span>
                        <span className="w-1/5 text-center text-sm font-semibold">
                          {product.price}
                        </span>
                      </div>
                    ))}

                    <Link
                      href="/"
                      className="mt-10 flex text-sm font-semibold text-indigo-600"
                    >
                      <svg
                        className="mr-2 w-4 fill-current text-indigo-600"
                        viewBox="0 0 448 512"
                      >
                        <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                      </svg>
                      Continue Shopping
                    </Link>
                  </div>

                  <div id="summary" className="w-1/4 px-8 py-10">
                    <h1 className="border-b pb-8 text-2xl font-semibold">
                      Order&nbsp;Summary
                    </h1>
                    <div className="mb-5 mt-10 flex justify-between">
                      <span className="text-sm font-semibold uppercase">
                        {cart.length}&nbsp;Items&nbsp;
                      </span>
                      <span className="text-sm font-semibold">${totalSum}</span>
                    </div>
                    {/* Other components */}
                    <div>
                      <label className="mb-3 inline-block text-sm font-medium">
                        Shipping:
                      </label>
                      <div className="standard block w-full p-2 text-sm bg-gray-200 text-gray-600">
                        <p>Standard&nbsp;-&nbsp;$10.50</p>
                      </div>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className="mt-8 border-t">
                      <div className="flex justify-between py-6 text-sm font-semibold uppercase">
                        <span>Total&nbsp;Cost:&nbsp;</span>
                        <span>${FINAL_PRICE}</span>
                      </div>
                      <button className="checkoutBtn w-full bg-indigo-500 py-3 text-sm font-semibold uppercase text-white hover:bg-indigo-600">
                        Checkout
                      </button>
                    </div>
                    {/*  */}
                  </div>
                  {/*  */}

                  {/*  */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default Cart;
