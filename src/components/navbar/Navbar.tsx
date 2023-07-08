import React from "react";
import { api } from "~/utils/api";
import {
  SignInButton,
  SignUpButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";

const CreateUserWizard = () => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="flex w-full gap-4">
      <img
        src={user.profileImageUrl}
        alt="Profile image"
        className="ml-1 mr-1 h-12 w-12 rounded-full"
      />
      <input placeholder="Type some text" className="bg-transparent"></input>
    </div>
  );
};


const Navbar: React.FC = () => {
  const user = useUser();

  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Something went wrong...</div>;

  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex flex-wrap items-center justify-between p-4">
        <div>{user.isSignedIn && <CreateUserWizard />}</div>
        <a href="/">Home</a>
        <a href="/cart">Cart</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/landing">Landing</a>

        <div className="flex md:order-2">
          <button
            type="button"
            className="ml-3 mr-3 rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
          >
            {!user.isSignedIn && <SignInButton />}
            {user.isSignedIn && <SignOutButton />}
          </button>

          {!user.isSignedIn && (
            <button
              type="button"
              className="ml-3 mr-3 rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
            >
              <SignUpButton />
            </button>
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
