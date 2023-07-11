import React, { useState } from "react";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";

import Link from "next/link";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const user = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router
      .push(`/search-results?query=${encodeURIComponent(searchQuery)}`)
      .catch((error) => {
        console.error(error);
      });
  };


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

        <form onSubmit={handleSearchSubmit} className="text-black">
          <input
            type="search"
            id="default-search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            required
          />
          <button className="ml-4 mr-4" type="submit">
            Search
          </button>
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
