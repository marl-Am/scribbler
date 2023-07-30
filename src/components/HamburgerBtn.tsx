import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

export default function HamburgerBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;

  return (
    <>
      <div className="relative gap-2">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="group z-10 flex h-10 w-10 flex-col items-center justify-center rounded border-2 border-black cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={`${genericHamburgerLine} ${
                isOpen
                  ? "translate-y-3 rotate-45 opacity-50 group-hover:opacity-100"
                  : "opacity-50 group-hover:opacity-100"
              }`}
            />
            <div
              className={`${genericHamburgerLine} ${
                isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
              }`}
            />
            <div
              className={`${genericHamburgerLine} ${
                isOpen
                  ? "-translate-y-3 -rotate-45 opacity-50 group-hover:opacity-100"
                  : "opacity-50 group-hover:opacity-100"
              }`}
            />
          </label>
          {isOpen && (
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-md z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <Link
                href="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Home
              </Link>

              {user.isSignedIn && (
                <Link
                  href="/inbox"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Inbox
                </Link>
              )}

              {user.isSignedIn && (
                <Link
                  href="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Orders
                </Link>
              )}

              {user.isSignedIn && (
                <Link
                  href="/user_details"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  User Details
                </Link>
              )}

              <Link
                href="/view_order"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                View Order
              </Link>

              {!user.isSignedIn && (
                <SignInButton mode="modal">
                  <button className="block px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 lg:hidden">
                    Sign In
                  </button>
                </SignInButton>
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
