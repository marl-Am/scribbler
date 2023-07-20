import React, { ChangeEvent, useState } from "react";

import Product from "~/components/Product";
import { products } from "~/data/products";
import Head from "next/head";
import Hero from "~/components/Hero";

export default function Home() {
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

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="home">
        <div className="center-this mx-auto mt-2 justify-center">
          <Hero />
          <section id="shipping" className="bg-black py-4 text-center">
            <div className="container">
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 md:w-1/4">
                  <div className="shipping-box mb-4 ml-2 mr-2 rounded bg-blue-900 p-4">
                    <div className="box-title ml-4 inline-grid">
                      <h3 className="text-md font-bold text-white">
                        Standard&nbsp;Shipping
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="w-full px-4 md:w-1/4">
                  <div className="shipping-box mb-4 ml-2 mr-2 rounded bg-blue-900 p-4">
                    <div className="box-title ml-4 inline-grid">
                      <h3 className="text-md font-bold text-white">
                        Used&nbsp;Items
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/4">
                  <div className="shipping-box mb-4 ml-2 mr-2 rounded bg-blue-900 p-4">
                    <div className="box-title ml-4 inline-grid">
                      <h3 className="text-md font-bold text-white">
                        Huge&nbsp;Savings
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/4">
                  <div className="shipping-box mb-4 ml-2 mr-2 rounded bg-blue-900 p-4">
                    <div className="box-title ml-4 inline-grid">
                      <h3 className="text-md font-bold text-white">
                        No&nbsp;Returns
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <article className="flex justify-center">
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
        <div className="place-center w-100 b-8 mx-auto mt-8 grid flex-wrap justify-center gap-4 sm:grid-cols-2 md:max-w-[900px] md:grid-cols-4">
          {/* Show products 0 to 8 */}
          {products
            .filter(
              (product) =>
                categoryFilter === "All" || product.category === categoryFilter
            )
            .sort((a, b) =>
              sortType === "Low to High" ? a.price - b.price : b.price - a.price
            )
            .slice(
              (currentPage - 1) * productsToShowPerPage,
              currentPage * productsToShowPerPage
            )
            .map((product) => (
              <Product product={product} key={product.id} />
            ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="join mb-2 gap-2">
            <input
              className="btn-square join-item btn"
              type="radio"
              name="options"
              value="1"
              aria-label="1"
              checked={currentPage === 1}
              onChange={handlePageChange}
            />
            <input
              className="btn-square join-item btn"
              type="radio"
              name="options"
              value="2"
              aria-label="2"
              checked={currentPage === 2}
              onChange={handlePageChange}
            />
          </div>
        </div>
        {/* Pagination */}
      </div>
    </>
  );
}
