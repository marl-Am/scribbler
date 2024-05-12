import React, { useContext, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import Head from "next/head";
import Hero from "~/components/Hero";
import { CartContext } from "~/context/CartContext";
import type { CartItem } from "~/context/CartContext";
import { toast } from "react-toastify";

import StoreDetails from "~/components/StoreDetails";
import type { Product } from "@prisma/client";

interface GetProductsResponse {
  results: Product[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isAllOutOfStock, setIsAllOutOfStock] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortType, setSortType] = useState("Low to High");
  const productsToShowPerPage = 8;

  function handlePageChange(event: ChangeEvent<HTMLInputElement>) {
    setCurrentPage(Number(event.target.value));
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(event.target.value);
  };

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

  // get products from database
  useEffect(() => {
    fetch("/api/prisma/getProducts")
      .then((response) => response.json())
      .then((data: GetProductsResponse) => {
        if (data && data.results) {
          setProducts(data.results);

          const allOutOfStock = data.results.every(
            (product) => product.stock === 0
          );
          setIsAllOutOfStock(allOutOfStock);
        } else {
          console.error("Invalid data structure:", data);
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("An error occurred while fetching products:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="home bg-base-200">
        <div className="center-this bg-black">
          <Hero />
          <StoreDetails />
        </div>

        {isLoading ? (
          // Loading spinner code
          <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center">
            <div className="text-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="mr-2 inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading products...</span>
              </div>
            </div>
          </div>
        ) : isAllOutOfStock ? (
          // Out of stock message code
          <div className="grid h-screen place-content-center bg-white px-4">
            <div className="text-center">
              <h1 className="text-9xl font-black text-gray-400">
                Out of Stock
              </h1>

              <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Uh-oh!
              </p>

              <p className="mt-4 text-gray-500">We have no items left.</p>

              <span className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
                Please Come Back Later
              </span>
            </div>
          </div>
        ) : (
          // Display products
          <div>
            <article className="flex justify-center" id="products">
              <ul className="mb-2 ml-2 mr-2 mt-4 flex flex-wrap gap-4">
                <li
                  onClick={() => setCategoryFilter("All")}
                  className="get-started cursor-pointer hover:bg-black hover:text-white"
                >
                  All
                </li>
                <li
                  onClick={() => setCategoryFilter("Books")}
                  className="get-started cursor-pointer hover:bg-black hover:text-white"
                >
                  Books
                </li>
                <li
                  onClick={() => setCategoryFilter("Electronics")}
                  className="get-started cursor-pointer hover:bg-black hover:text-white"
                >
                  Electronics
                </li>
                <li
                  onClick={() => setCategoryFilter("Games")}
                  className="get-started cursor-pointer hover:bg-black hover:text-white"
                >
                  Games
                </li>
                <li
                  onClick={() => setCategoryFilter("Others")}
                  className="get-started cursor-pointer hover:bg-black hover:text-white"
                >
                  Others
                </li>
                <li>
                  <select
                    className="get-started cursor-pointer hover:bg-black hover:text-white"
                    onChange={handleSortChange}
                    value={sortType}
                  >
                    <option value="Low to High" className="cursor-pointer">
                      Price: Low to High
                    </option>
                    <option value="High to Low" className="cursor-pointer">
                      Price: High to Low
                    </option>
                  </select>
                </li>
              </ul>
            </article>

            {/* Products */}
            <div className="my-8">
              <div className="container mx-auto px-6">
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products
                    .filter(
                      (product) =>
                        categoryFilter === "All" ||
                        product.category === categoryFilter
                    )
                    .sort((a, b) =>
                      sortType === "Low to High"
                        ? a.price - b.price
                        : b.price - a.price
                    )
                    .slice(
                      (currentPage - 1) * productsToShowPerPage,
                      currentPage * productsToShowPerPage
                    )
                    .map((product) => (
                      <div
                        key={product.id}
                        className="mx-auto w-full max-w-sm overflow-hidden rounded-md shadow-md"
                      >
                        <div
                          className="flex h-56 w-full items-end justify-end bg-cover"
                          style={{
                            backgroundImage: `url('${product.image}')`,
                          }}
                          aria-label="Description of the image"
                        >
                          <button
                            disabled={product.stock === 0}
                            onClick={() => addToCart(product)}
                            className="mx-5 -mb-4 rounded-full bg-emerald-600 p-2 text-white hover:bg-emerald-500 focus:bg-emerald-500 focus:outline-none"
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
                        </div>
                        <div className="px-5 py-3">
                          <h3 className="uppercase text-gray-700">
                            {product.name}
                          </h3>
                          <span className="mt-2 text-gray-500">
                            ${(product.price / 100).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Pagination */}
            {/* Conditional Rendering for Pagination or Store Closed Message */}
            {!isLoading && products.length > 0 ? (
              <div className="flex justify-center">
                <div className="join mb-2 gap-2">
                  <input
                    className="btn btn-square join-item p-6"
                    type="radio"
                    name="options"
                    value="1"
                    aria-label="1"
                    checked={currentPage === 1}
                    onChange={handlePageChange}
                  />
                  <input
                    className="btn btn-square join-item p-6"
                    type="radio"
                    name="options"
                    value="2"
                    aria-label="2"
                    checked={currentPage === 2}
                    onChange={handlePageChange}
                  />
                </div>
              </div>
            ) : (
              <div className="grid h-screen place-content-center bg-white px-4">
                <div className="text-center">
                  <h1 className="text-9xl font-black text-gray-400">
                    Store Closed
                  </h1>

                  <span className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
                    Please Come Back Later
                  </span>
                </div>
              </div>
            )}

            {/* Pagination */}
          </div>
        )}

        {/*  */}
      </div>
    </>
  );
}
