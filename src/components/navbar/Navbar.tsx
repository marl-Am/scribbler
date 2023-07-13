import React, { useState } from "react";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";
import { useCart } from "~/context/CartContext";

const Navbar: React.FC = () => {
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const { cart } = useCart();
  const numberOfItemsInCart = cart.reduce(
    (count, item) => count + item.stock,
    0
  );

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router
      .push(`/search-results?query=${encodeURIComponent(searchQuery)}`)
      .catch((error) => {
        console.error(error);
      });
  };

  const links = [
    { href: "/", text: "Home" },
    { href: "/orders", text: "Orders" },
    { href: "/inbox", text: "Inbox" },
  ];

  return (
    <div className="nav-container">
      <div className="nav-body">
        <header className="">
          <nav className="">
            <section className="bg-grey-800 border-md px-2.5 py-1.5 shadow-md">
              <main className="flex items-center justify-between">
                <section className="flex items-center space-x-8">
                  <Link className="" href="/">
                    <div className="flex items-center space-x-2">
                      <Image
                        className="rounded object-cover"
                        alt="logo"
                        src="/favicon.ico"
                        width={48}
                        height={48}
                      ></Image>
                      <h2 className="text-sm font-bold capitalize tracking-wider text-gray-200 lg:text-lg">
                        Shop
                      </h2>
                    </div>
                  </Link>

                  <div className="hidden lg:block">
                    <ul className="flex items-center space-x-5">
                      {links
                        .filter((link) => user.isSignedIn || link.href === "/")
                        .map((link, index) => (
                          <li
                            key={index} // This is the new line
                            className={
                              activeLink === index ? "nav_link active" : ""
                            }
                            onClick={() => setActiveLink(index)}
                          >
                            <Link
                              className="text-md capitalize"
                              href={link.href}
                            >
                              {link.text}
                            </Link>
                          </li>
                        ))}
                      <li className="text-md nav_link capitalize">
                        {!user.isSignedIn && (
                          <SignInButton>
                            <button className="btn">Sign In</button>
                          </SignInButton>
                        )}
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Search & Cart & User Icon */}
                <section className="flex items-center space-x-5">
                  <div className="">
                    <ul className="flex items-center space-x-4">
                      <li className="hidden lg:block">
                        <div className="relative">
                          <div className="absolute left-1.5 top-1.5">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M15.4 13.5h-.8l-.3-.3c1.1-1.3 1.7-3 1.7-4.8 0-3.9-3.1-7-7-7S1 4.5 1 8.4s3.1 7 7 7c1.8 0 3.5-.6 4.8-1.7l.3.3v.8l4.6 4.6c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L15.4 13.5zm-6.4 0c-2.5 0-4.6-2.1-4.6-4.6 0-2.5 2.1-4.6 4.6-4.6 2.5 0 4.6 2.1 4.6 4.6 0 2.5-2.1 4.6-4.6 4.6z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          <form onSubmit={handleSearchSubmit}>
                            <input
                              className="h-8 w-full rounded-md bg-gray-700 p-1 pl-8 ring-yellow-300 focus:bg-gray-100 focus:text-black focus:outline-none focus:ring"
                              type="search"
                              placeholder="Search"
                              value={searchQuery}
                              onChange={(event) =>
                                setSearchQuery(event.target.value)
                              }
                              required
                            ></input>
                          </form>
                        </div>
                      </li>

                      {/* Cart Icon */}
                      <li className="mt-1">
                        <Link href="/cart">
                          <label
                            tabIndex={0}
                            className="btn-ghost btn-circle btn"
                          >
                            <div className="indicator">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400 hover:text-gray-200 focus:text-gray-200"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                              </svg>
                              {numberOfItemsInCart > 0 && (
                                <span className="badge badge-sm indicator-item">
                                  {numberOfItemsInCart}
                                </span>
                              )}
                            </div>
                          </label>
                        </Link>
                      </li>

                      {/* User Icon */}
                      <li className="">
                        {user.isSignedIn && (
                          <div className="w-7 rounded-full object-cover">
                            <UserButton afterSignOutUrl="/" />
                          </div>
                        )}
                      </li>

                      {/* Hamburger Icon */}
                      <li className="block lg:hidden">
                        <button
                          className="h-7 w-7 rounded p-1 ring-yellow-300 ring-opacity-50 focus:bg-gray-800 focus:outline-none focus:ring"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          <svg
                            className="h-5 w-5 fill-current text-gray-400 hover:text-white lg:h-6 lg:w-6"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                          </svg>
                        </button>
                      </li>
                    </ul>
                  </div>
                </section>
              </main>
            </section>

            {/* Mobile Nav */}
            <section
              className={`space-y-4 bg-yellow-100 p-4 lg:hidden ${
                isOpen ? "block" : "hidden"
              }`}
              id="menu"
            >
              <div className="">
                <ul className="flex flex-col space-y-5">
                  <li className="nav_link active">
                    <Link
                      href={"/"}
                      className="text-md nav_link capitalize text-gray-500 hover:text-yellow-500"
                    >
                      Home
                    </Link>
                  </li>
                  {user.isSignedIn && (
                    <>
                      <li className="">
                        <Link
                          href={"/orders"}
                          className="text-md nav_link capitalize text-gray-500 hover:text-yellow-500"
                        >
                          Orders
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          href={"/inbox"}
                          className="text-md nav_link capitalize text-gray-500 hover:text-yellow-500"
                        >
                          Inbox
                        </Link>
                      </li>
                    </>
                  )}
                  <li className="text-md nav_link capitalize text-gray-500 hover:text-yellow-500">
                    {!user.isSignedIn && (
                      <SignInButton>
                        <button className="btn">Sign In</button>
                      </SignInButton>
                    )}
                  </li>
                </ul>
              </div>

              {/* Mobile Search Bar*/}
              <section className="" w-full>
                <div className="relative">
                  <div className="absolute left-1.5 top-1.5">
                    <svg
                      className="h-5 w-5 text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15.4 13.5h-.8l-.3-.3c1.1-1.3 1.7-3 1.7-4.8 0-3.9-3.1-7-7-7S1 4.5 1 8.4s3.1 7 7 7c1.8 0 3.5-.6 4.8-1.7l.3.3v.8l4.6 4.6c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L15.4 13.5zm-6.4 0c-2.5 0-4.6-2.1-4.6-4.6 0-2.5 2.1-4.6 4.6-4.6 2.5 0 4.6 2.1 4.6 4.6 0 2.5-2.1 4.6-4.6 4.6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <form onSubmit={handleSearchSubmit}>
                    <input
                      className="h-8 w-full rounded-md bg-gray-100 p-1 pl-8 ring-yellow-300 ring-opacity-75 focus:bg-gray-100 focus:outline-none focus:ring"
                      type="search"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      required
                    ></input>
                  </form>
                </div>
              </section>
            </section>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Navbar;
