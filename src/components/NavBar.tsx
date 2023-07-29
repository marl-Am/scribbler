import { useShoppingCart } from "use-shopping-cart";
import Link from "next/link";
import ShoppingCart from "./ShoppingCart";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";
import { useState, useRef } from "react";
import { useRouter } from "next/router";

const NavBar: React.FC = () => {
  const user = useUser();
  const router = useRouter();

  const { handleCartClick, cartCount } = useShoppingCart();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm) {
      router
        .push(`/search-results?term=${searchTerm}`)
        .then(() => dialogRef.current?.close())
        .catch((err) => console.log(err));
    }
  };

  const closeDialog = (event: React.MouseEvent) => {
    event.stopPropagation(); // This will stop the event from bubbling up and prevent any parent handler from being executed.
    event.preventDefault(); // This will prevent the event from carrying out the default action it was supposed to do. In this case, it will prevent form submission.
    dialogRef.current?.close();
  };

  return (
    <div className="nav-container bg-base-200">
      <div className="navbar">
        {/* Responsive Dropdown Menu */}
        <div className="navbar-start">
          <div className="dropdown gap-2">
            <label
              tabIndex={0}
              className="btn-ghost btn-square btn"
              onClick={() => setMenuIsOpen(!menuIsOpen)}
            >
              <svg viewBox="0 0 100 80" width="35" height="35">
                <rect width="100" height="20"></rect>
                <rect y="30" width="100" height="20"></rect>
                <rect y="60" width="100" height="20"></rect>
              </svg>
            </label>
            {menuIsOpen && (
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
              >
                {user.isSignedIn && (
                  <Link
                    href="/user_details"
                    className="get-started-drop flex items-center justify-center bg-black text-white hover:bg-white hover:text-black"
                  >
                    User Details
                  </Link>
                )}
                <Link
                  href="/"
                  className="get-started-drop flex items-center justify-center bg-black text-white hover:bg-white hover:text-black"
                >
                  Homepage
                </Link>
                <Link
                  href="/view_order"
                  className="get-started-drop flex items-center justify-center bg-black text-white hover:bg-white hover:text-black"
                >
                  View Order
                </Link>
                {user.isSignedIn && (
                  <Link
                    href="/orders"
                    className="get-started-drop flex items-center justify-center bg-black text-white hover:bg-white hover:text-black"
                  >
                    Orders
                  </Link>
                )}

                {user.isSignedIn && (
                  <Link
                    href="/inbox"
                    className="get-started-drop flex items-center justify-center bg-black text-white hover:bg-white hover:text-black"
                  >
                    Inbox
                  </Link>
                )}

                {/* Search */}
                <button
                  className="get-started-drop flex items-center justify-center bg-black text-white hover:bg-white hover:text-black lg:hidden"
                  onClick={() => dialogRef.current?.showModal()}
                >
                  Search
                </button>

                {!user.isSignedIn && (
                  <SignInButton mode="modal">
                    <button className="get-started-drop btn flex items-center justify-center bg-black text-white hover:bg-white hover:text-black lg:hidden">
                      Sign In
                    </button>
                  </SignInButton>
                )}
              </ul>
            )}
          </div>

          {/* User Profile */}
          {user.isSignedIn && (
            <div className="relative mr-2">
              <span className="h-10 w-10 rounded">
                <UserButton afterSignOutUrl="/" />
              </span>
              <span className="absolute left-7 top-0  h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400 dark:border-gray-800"></span>
            </div>
          )}
          {/* User Profile */}
        </div>
        {/* Drop down ends */}

        {/* Name of Website */}
        <div className="navbar-center text-2xl font-bold">
          <Link href={"/"} className="ml-2 mr-2 hover:underline">
            Scribbler
          </Link>
        </div>

        {/* Search */}
        <div className="navbar-end">
          {/* Sign In */}
          {!user.isSignedIn && (
            <SignInButton mode="modal">
              <button className="btn-md btn mr-2 hidden bg-black text-white hover:border-black hover:bg-white hover:text-black lg:block">
                Sign In
              </button>
            </SignInButton>
          )}

          <button
            className="btn mr-2 hidden bg-black hover:bg-white lg:block"
            onClick={() => dialogRef.current?.showModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="my-svg h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Search Modal */}
          <div>
            <div>
              <dialog ref={dialogRef} id="my_modal_3" className="modal">
                <form className="modal-box" onSubmit={handleSubmit}>
                  <button
                    className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2"
                    onClick={closeDialog}
                  >
                    ✕
                  </button>

                  <h3 className="text-center text-lg font-bold">
                    Find Item(s)
                  </h3>
                  <div className="flex justify-center">
                    <input
                      className="input-bordered input-info input w-full max-w-xs"
                      type="search"
                      placeholder="Search"
                      onChange={handleChange}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          handleSubmit(event);
                        }
                      }}
                      required
                    />

                    <button
                      className="btn ml-2 mr-2 hover:bg-green-500 hover:text-white"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </dialog>
            </div>
          </div>

          {/* Cart */}
          <button
            className="btn mr-2 bg-black hover:bg-white"
            onClick={() => handleCartClick()}
          >
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-shopping-cart h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M17 17h-11v-14h-2"></path>
                <path d="M6 5l14 1l-1 7h-13"></path>
              </svg>
              <span className="badge badge-primary badge-xs indicator-item absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform bg-white text-black hover:bg-black hover:text-white">
                {cartCount}
              </span>
              <ShoppingCart />
            </div>
          </button>

        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default NavBar;
