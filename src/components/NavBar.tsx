import { useShoppingCart } from "use-shopping-cart";
import Link from "next/link";
import ShoppingCart from "./ShoppingCart";
import { SignInButton, useUser, UserButton } from "@clerk/nextjs";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import HamburgerBtn from "./HamburgerBtn";

const NavBar: React.FC = () => {
  const user = useUser();
  const router = useRouter();

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

  return (
    <div className="nav-container bg-gray-700">
      <div className="navbar">
        {/* Responsive Dropdown Menu */}
        <div className="navbar-start">
            <HamburgerBtn />

          {/* User Profile */}
          {user.isSignedIn && (
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
          {!user.isSignedIn && (
            <SignInButton mode="modal">
              <button className="btn-md btn mr-2 hidden border border-none bg-gray-700 text-white hover:border-black hover:bg-white hover:text-black lg:block">
                Sign In
              </button>
            </SignInButton>
          )}

          <button
            className="btn mr-2 hidden border border-none bg-gray-700 hover:bg-white lg:block"
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