import React, { useState } from "react";
import {
  SignInButton,
  useUser,
  UserButton,
} from "@clerk/nextjs";

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

        <div className="mt-4 lg:mt-0 lg:flex lg:items-center lg:justify-end">
          {!user.isSignedIn && (
            <div className="mb-2 lg:mb-0 lg:mr-2">
              <SignInButton>
                <button className="btn ml-3 mr-3 rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0">
                  Sign In
                </button>
              </SignInButton>
            </div>
          )}

          <Link
            className="mr-4 block text-teal-200 hover:text-white lg:inline-block"
            href="/cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 22"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              shape-rendering="geometricPrecision"
              className="h-6 transition-all ease-in-out hover:scale-110 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <path d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V5L16 1H4Z"></path>
              <path d="M1 5H19"></path>
              <path d="M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9"></path>
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
