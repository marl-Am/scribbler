import React from "react";
import { api } from "~/utils/api";
import {
  SignInButton,
  SignUpButton,
  SignOutButton,
  useUser
} from "@clerk/nextjs";

import Link from "next/link";
// import CreateUserWizard from "../CreateUserWizard";

const Navbar = () => {
  const user = useUser();
  // if (!user || !user.user) return null;
  const displayName =
    `${user.user?.firstName}` || `${user.user?.primaryEmailAddress}`;

  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex flex-wrap items-center justify-between p-4">
        <Link href="/">Home</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/dashboard">Dashboard</Link>

        <div className="flex md:order-2">
          {user.isSignedIn && (
            <div className="flex">
              <img
                src={user.user?.profileImageUrl}
                alt={`${displayName}'s Profile`}
                className="ml-1 mr-1 h-10 w-10 rounded-full"
              />
            </div>
          )}
          {!user.isSignedIn && (
            <SignInButton>
              <button className="ml-3 mr-3 rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0">
                Sign In
              </button>
            </SignInButton>
          )}

          {user.isSignedIn && (
            <SignOutButton>
              <button className="ml-3 mr-3 rounded-lg bg-yellow-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-yellow-800 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 md:mr-0">
                Sign Out
              </button>
            </SignOutButton>
          )}

          {!user.isSignedIn && (
            <SignUpButton>
              <button className="ml-3 mr-3 rounded-lg bg-orange-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 md:mr-0">
                Sign Up
              </button>
            </SignUpButton>
          )}

          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
