import { useShoppingCart } from "use-shopping-cart";
import Link from "next/link";
import ShoppingCart from "./ShoppingCart";
import { SignInButton, useUser, UserButton, useAuth } from "@clerk/nextjs";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const NavBar: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const { userId } = useAuth();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;

  const { handleCartClick, cartCount } = useShoppingCart();

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

  // In your component
  useEffect(() => {
    if (isSignedIn && userId) {
      const saveUser = async () => {
        const username = user?.username as string;
        const emailAddress = user?.emailAddresses[0]?.emailAddress as string;

        // Ensure username and emailAddress are not undefined before proceeding
        if (username && emailAddress) {
          const userData = {
            clerkId: userId,
            name: username,
            email: emailAddress,
          };

          try {
            await axios.post("/api/saveUser", userData);
          } catch (error) {
            console.error("Failed to save user", error);
          }
        } else {
          console.error("Username or email address is missing");
        }
      };

      void saveUser();
    }
  }, [isSignedIn, userId, user?.username, user?.emailAddresses]);

  return (
    <div className="nav-container bg-gray-700">
      <div className="navbar">
        {/* Responsive Dropdown Menu */}
        <div className="navbar-start">
          {/* Hamburger Menu */}
          <div className="relative gap-2">
            <div className="dropdown">
              <label
                tabIndex={0}
                className="group z-10 flex h-10 w-10 cursor-pointer flex-col items-center justify-center"
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
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:underline"
                  >
                    Home
                  </Link>

                  {isSignedIn && (
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:underline"
                    >
                      Orders
                    </Link>
                  )}

                  {isSignedIn && (
                    <Link
                      href="/user_details"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:underline"
                    >
                      User Details
                    </Link>
                  )}

                  {!isSignedIn && (
                    <SignInButton mode="modal">
                      <button className="block px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:underline lg:hidden">
                        Sign In
                      </button>
                    </SignInButton>
                  )}
                </ul>
              )}
            </div>
          </div>
          {/* Hamburger Menu Ends */}

          {/* User Profile */}
          {isSignedIn && (
            <div className="relative ml-2 mr-2">
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
          <Link href={"/"} className="ml-2 mr-2 text-white hover:underline">
            Scribbler
          </Link>
        </div>

        {/* Search */}
        <div className="navbar-end">
          {/* Sign In */}
          {!isSignedIn && (
            <SignInButton mode="modal">
              <button className="btn-md btn mr-2 hidden border border-none bg-gray-700 text-white hover:border-black hover:bg-white hover:text-black hover:underline lg:block">
                Sign In
              </button>
            </SignInButton>
          )}

          <button
            className="btn mr-2 border border-none bg-gray-700 hover:bg-white"
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
                      className="input-bordered input-info input w-full max-w-xs focus:outline-none"
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
                      autoFocus
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
            className="btn mr-2 border border-none bg-gray-700 hover:bg-white"
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
