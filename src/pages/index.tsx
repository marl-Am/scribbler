import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";

import Product from "~/components/Product";
import { products } from "~/data/products";
import Head from "next/head";
import Hero from "~/components/Hero";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useShoppingCart } from "use-shopping-cart";

export default function Home() {
  const router = useRouter();
  const { clearCart } = useShoppingCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortType, setSortType] = useState("Low to High");
  const productsToShowPerPage = 8;
  const [toastShown, setToastShown] = useState(false);

  function handlePageChange(event: ChangeEvent<HTMLInputElement>) {
    setCurrentPage(Number(event.target.value));
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(event.target.value);
  };


  useEffect(() => {
    // Extract success query from router
    const successQuery = router.query.success;

    // Check if successQuery exists and toast has not been shown yet
    if (!toastShown && successQuery) {
      // If successQuery is 'true', show success message, clear cart and prevent the toast from showing up again
      if (successQuery === "true") {
        clearCart();
        setToastShown(true);
        toast.success(
          "Your payment was successful. Thank you for your purchase.",
          {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }
      // If successQuery is 'false', show warning message and prevent the toast from showing up again
      else if (successQuery === "false") {
        setToastShown(true);
        toast.warn("Left the checkout process without completing a purchase.", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
    // Reset toastShown if successQuery is not defined, this enables toast messages to show up again if success query changes
    else if (!successQuery && toastShown) {
      setToastShown(false);
    }
  }, [router.query.success, clearCart, toastShown]);


  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="home bg-base-200">
        <div className="center-this bg-black">
          <Hero />

          {/* <section id="shipping" className=" bg-black">
            <div className="container flex items-center justify-center text-center">
              <div className="m-2 -mx-4 flex flex-wrap">
                <div className="flex w-full justify-around px-4 md:w-full">
                  <div className="shipping-box mb-4 ml-2 mr-2 rounded bg-blue-900 p-2">
                    <div className="box-title ml-4 inline-grid text-center">
                      <h3 className="text-md font-bold text-white">
                        Standard Shipping
                      </h3>
                    </div>
                  </div>

                  <div className="shipping-box mb-4 ml-2 mr-2 rounded bg-blue-900 p-2">
                    <div className="box-title ml-4 inline-grid text-center">
                      <h3 className="text-md font-bold text-white">
                        Used Items
                      </h3>
                    </div>
                  </div>

                  <div className="shipping-box mb-4 ml-2 mr-2 rounded bg-blue-900 p-2">
                    <div className="box-title ml-4 inline-grid text-center">
                      <h3 className="text-md font-bold text-white">
                        Huge Savings
                      </h3>
                    </div>
                  </div>

                  <div className="shipping-box mb-4 ml-2 mr-2 rounded bg-blue-900 p-2">
                    <div className="box-title ml-4 inline-grid text-center">
                      <h3 className="text-md font-bold text-white">
                        No Returns
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          {/* Store Details */}
          <div
            data-aos="fade-up"
            className="best-services aos-init aos-animate flex w-full flex-col space-y-10 bg-white px-10 py-10 lg:h-[110px] lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:py-0"
          >
            <div className="item">
              <div className="flex items-center space-x-5">
                <div>
                  <span>
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1H5.63636V24.1818H35"
                        stroke="#FFBB38"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="square"
                      ></path>
                      <path
                        d="M8.72763 35.0002C10.4347 35.0002 11.8185 33.6163 11.8185 31.9093C11.8185 30.2022 10.4347 28.8184 8.72763 28.8184C7.02057 28.8184 5.63672 30.2022 5.63672 31.9093C5.63672 33.6163 7.02057 35.0002 8.72763 35.0002Z"
                        stroke="#FFBB38"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="square"
                      ></path>
                      <path
                        d="M31.9073 35.0002C33.6144 35.0002 34.9982 33.6163 34.9982 31.9093C34.9982 30.2022 33.6144 28.8184 31.9073 28.8184C30.2003 28.8184 28.8164 30.2022 28.8164 31.9093C28.8164 33.6163 30.2003 35.0002 31.9073 35.0002Z"
                        stroke="#FFBB38"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="square"
                      ></path>
                      <path
                        d="M34.9982 1H11.8164V18H34.9982V1Z"
                        stroke="#FFBB38"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="square"
                      ></path>
                      <path
                        d="M11.8164 7.18164H34.9982"
                        stroke="#FFBB38"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="square"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div>
                  <p className="font-700 mb-1 text-[15px] tracking-wide text-black">
                    Standard Shipping
                  </p>
                  <p className="text-qgray text-sm">When ordering over $8.99</p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="flex items-center space-x-5">
                <div>
                  <span>
                    <svg
                      width="32"
                      height="34"
                      viewBox="0 0 32 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M31 17.4502C31 25.7002 24.25 32.4502 16 32.4502C7.75 32.4502 1 25.7002 1 17.4502C1 9.2002 7.75 2.4502 16 2.4502C21.85 2.4502 26.95 5.7502 29.35 10.7002"
                        stroke="#FFBB38"
                        stroke-width="2"
                        stroke-miterlimit="10"
                      ></path>
                      <path
                        d="M30.7 2L29.5 10.85L20.5 9.65"
                        stroke="#FFBB38"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="square"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div>
                  <p className="font-700 mb-1 text-[15px] tracking-wide text-black">
                    No Returns
                  </p>
                  <p className="text-qgray text-sm">
                    Items As Is
                  </p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="flex items-center space-x-5">
                <div>
                  <span>
                    <svg
                      width="32"
                      height="38"
                      viewBox="0 0 32 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.6654 18.667H9.33203V27.0003H22.6654V18.667Z"
                        stroke="#FFBB38"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="square"
                      ></path>
                      <path
                        d="M12.668 18.6663V13.6663C12.668 11.833 14.168 10.333 16.0013 10.333C17.8346 10.333 19.3346 11.833 19.3346 13.6663V18.6663"
                        stroke="#FFBB38"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="square"
                      ></path>
                      <path
                        d="M31 22C31 30.3333 24.3333 37 16 37C7.66667 37 1 30.3333 1 22V5.33333L16 2L31 5.33333V22Z"
                        stroke="#FFBB38"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="square"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div>
                  <p className="font-700 mb-1 text-[15px] tracking-wide text-black">
                    Secure Payment
                  </p>
                  <p className="text-qgray text-sm">
                    100% Secure Online Payment
                  </p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="flex items-center space-x-5">
                <div>
                  <span>
                    <svg
                      width="32"
                      height="35"
                      viewBox="0 0 32 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 13H5.5C2.95 13 1 11.05 1 8.5V1H7"
                        stroke="#FFBB38"
                        stroke-width="2"
                        stroke-miterlimit="10"
                      ></path>
                      <path
                        d="M25 13H26.5C29.05 13 31 11.05 31 8.5V1H25"
                        stroke="#FFBB38"
                        stroke-width="2"
                        stroke-miterlimit="10"
                      ></path>
                      <path
                        d="M16 28V22"
                        stroke="#FFBB38"
                        stroke-width="2"
                        stroke-miterlimit="10"
                      ></path>
                      <path
                        d="M16 22C11.05 22 7 17.95 7 13V1H25V13C25 17.95 20.95 22 16 22Z"
                        stroke="#FFBB38"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="square"
                      ></path>
                      <path
                        d="M25 34H7C7 30.7 9.7 28 13 28H19C22.3 28 25 30.7 25 34Z"
                        stroke="#FFBB38"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="square"
                      ></path>
                    </svg>
                  </span>
                </div>
                <div>
                  <p className="font-700 mb-1 text-[15px] tracking-wide text-black">
                    Used Items
                  </p>
                  <p className="text-qgray text-sm">
                    Original Product Guarenteed
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>

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
