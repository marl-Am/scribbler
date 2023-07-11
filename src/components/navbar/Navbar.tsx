import React, { useState } from "react";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";

import Link from "next/link";

const Navbar: React.FC = () => {
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 flex w-full flex-wrap items-center justify-between bg-teal-500 p-6">
      <div className="flex items-center">
        <div className="mr-6 flex-shrink-0 text-white">
          <span className="text-xl font-semibold tracking-tight">
            {user.isSignedIn && (
              <div className="mr-4 flex">
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </span>
        </div>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center rounded border border-teal-400 px-3 py-2 text-teal-200 hover:border-white hover:text-white"
        >
          <svg
            className="h-3 w-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div
        className={`block w-full flex-grow lg:flex lg:w-auto lg:items-center ${
          isOpen ? "" : "hidden"
        } lg:block`}
      >
        <div className="text-sm sm:mt-4 lg:flex-grow">
          <Link
            className="mr-4 block text-teal-200 hover:text-white lg:inline-block"
            href="/"
          >
            Home
          </Link>
        </div>

        <form>
          <label
            htmlFor="default-search"
            className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search products..."
              required
            ></input>
            <button
              type="submit"
              className="absolute bottom-2.5 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-4 lg:mt-0 lg:flex lg:items-center lg:justify-end">
          <Link
            className="mr-4 block text-teal-200 hover:text-white lg:inline-block"
            href="/cart"
          >
            Cart
          </Link>

          {!user.isSignedIn && (
            <div className="mb-2 lg:mb-0 lg:mr-2">
              <SignInButton>
                <button className="btn ml-3 mr-3 rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0">
                  Sign In
                </button>
              </SignInButton>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
