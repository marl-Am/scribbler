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
  // const [isOpen, setIsOpen] = useState(false);

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
      .catch((err) => console.log(err)); // Handle any errors here.
  }
};






  const closeDialog = (event: React.MouseEvent) => {
    event.stopPropagation(); // This will stop the event from bubbling up and prevent any parent handler from being executed.
    event.preventDefault(); // This will prevent the event from carrying out the default action it was supposed to do. In this case, it will prevent form submission.
    dialogRef.current?.close();
  };

  return (
    <div className="nav-container">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 gap-3 bg-base-100 p-2 shadow"
            >
              <Link href="/" className="hover:text-purple-600">
                Homepage
              </Link>
              {user.isSignedIn && (
                <Link href="/orders" className="hover:text-purple-600">
                  Orders
                </Link>
              )}
              {user.isSignedIn && (
                <Link href="/inbox" className="hover:text-purple-600">
                  Inbox
                </Link>
              )}
              {!user.isSignedIn && (
                <div className="block lg:hidden">
                  <SignInButton mode="modal">
                    <button className="btn-sm btn text-black hover:bg-purple-600 hover:text-white">
                      Sign In
                    </button>
                  </SignInButton>
                </div>
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link
            href={"/"}
            className="hover:text-purple-600 ml-2 mr-2 text-xl normal-case"
          >
            Scribbler
          </Link>
        </div>

        {/* Cart */}
        <div className="navbar-end gap-2">
          {/* Search */}
          <button
            className="btn-ghost btn-circle btn"
            onClick={() => dialogRef.current?.showModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
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

          {/* Sign In */}
          {!user.isSignedIn && (
            <div className="hidden lg:block">
              <SignInButton mode="modal">
                <button className="btn-sm btn text-black hover:bg-purple-600 hover:text-white">
                  Sign In
                </button>
              </SignInButton>
            </div>
          )}
          {/*  */}

          {/* Cart */}
          <button
            className="btn-ghost btn-circle btn"
            onClick={() => handleCartClick()}
          >
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-shopping-cart h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
              <span className="indicator-item badge badge-primary badge-xs absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform">
                {cartCount}
              </span>
            </div>
            <ShoppingCart />
          </button>

          {/* User Profile */}
          {user.isSignedIn && (
            <button className="btn-ghost btn-circle btn">
              <div className="indicator">
                <UserButton afterSignOutUrl="/" />
              </div>
            </button>
          )}
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default NavBar;