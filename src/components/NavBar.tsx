import Link from "next/link";
import {
  SignInButton,
  useUser,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { useState, useRef, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { CartContext } from "~/context/CartContext";
import { toast } from "react-toastify";

type StripeResponse = {
  url: string;
};

const NavBar: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const { userId } = useAuth();
  const router = useRouter();

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;

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
        .push(`/search_results?term=${searchTerm}`)
        .then(() => dialogRef.current?.close())
        .catch((err) => console.log(err));
    }
  };

  const closeDialog = (event: React.MouseEvent) => {
    event.stopPropagation(); // Stop the event from bubbling up and prevent any parent handler from being executed.
    event.preventDefault(); // Prevent the event from carrying out the default action: In this case, it will prevent form submission.
    dialogRef.current?.close();
  };

  useEffect(() => {
    if (isSignedIn && userId) {
      const saveUser = async () => {
        const username = user?.username as string;
        const emailAddress = user?.emailAddresses[0]?.emailAddress as string;

        if (username && emailAddress) {
          const userData = {
            clerkId: userId,
            name: username,
            email: emailAddress,
          };

          try {
            await axios.post("/api/prisma/saveUser", userData);
          } catch (error) {
            console.error("Failed to save user: ", error);
          }
        } else {
          console.error("Username or email address is missing");
        }
      };

      void saveUser();
    }
  }, [isSignedIn, userId, user?.username, user?.emailAddresses]);

  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("Navbar must be used within a CartProvider");
  }

  const { cart, removeItemFromCart } = cartContext;
  
  const handleCheckout = () => {
    if (!isSignedIn) {
      
      toast.warn("Sign-in to checkout.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    setIsCheckoutLoading(true);
    checkout();
  };

  const checkout = () => {
    if (isSignedIn && userId) {
      // Add a delay of 2 seconds (2000 milliseconds)
      setTimeout(() => {
        setIsCheckoutLoading(false);
      }, 2000);

      axios
        .post<StripeResponse>("/api/checkout_sessions", {
          userId: userId,
          itemsToOrder: cart,
        })
        .then((response) => {
          console.log("Stripe Response: ", response.data);
          window.location.href = response.data.url;
        })
        .catch((error) => {
          console.log("Checkout Error: ", error);
        });
    } else {
      alert("User not logged in!");
    }
  };

  // Cart Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="nav-container bg-base-100">
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
                  className="menu dropdown-content rounded-box menu-md z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
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
          <Link href={"/"} className="ml-2 mr-2 text-black hover:underline">
            Scribbler
          </Link>
        </div>

        {/* Search */}
        <div className="navbar-end">
          {/* Sign In */}
          {!isSignedIn && (
            <SignInButton mode="modal">
              <button className="btn btn-md mr-2 hidden border border-none bg-base-100 text-black hover:border-black hover:bg-base-300 hover:text-black hover:underline lg:block">
                Sign In
              </button>
            </SignInButton>
          )}

          <button
            className="btn mr-2 border border-none bg-base-100 hover:bg-base-300"
            onClick={() => dialogRef.current?.showModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="my-svg h-5 w-5"
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

          {/* Search Modal */}
          <div>
            <div>
              <dialog ref={dialogRef} id="my_modal_3" className="modal">
                <form className="modal-box" onSubmit={handleSubmit}>
                  <button
                    className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                    onClick={closeDialog}
                  >
                    ✕
                  </button>

                  <h3 className="text-center text-lg font-bold">
                    Find Item(s)
                  </h3>
                  <div className="flex justify-center">
                    <input
                      className="input input-bordered input-info w-full max-w-xs focus:outline-none"
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
            className="btn mr-2 border border-none bg-base-100 hover:bg-base-300"
            onClick={toggleDropdown}
          >
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-shopping-cart h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
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
              <span className="badge indicator-item badge-primary badge-xs absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform bg-white text-black hover:bg-black hover:text-white">
                {cart.length}
              </span>
            </div>
          </button>

          {/* dropdown */}
          {cart.length > 0 && isDropdownOpen && (
            <div className="absolute right-3 top-14 block w-80 flex-col rounded-md bg-white px-4 py-4 shadow-[0_5px_15px_0_rgba(0,0,0,.15)] md:right-9">
              {cart.map((item) => (
                <div key={item.id} className="mb-3 flex items-center gap-4">
                  <div className="overflow-hidden text-ellipsis text-xs">
                    {item.name}
                  </div>
                  <div className="ml-auto">
                    ${(item.price / 100).toFixed(2)}
                  </div>
                  <div className="ml-2 mr-2">
                    {/* Delete Item From Cart */}
                    <button
                      onClick={() => removeItemFromCart(item.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-full p-1 transition-colors duration-200 hover:bg-red-500"
                    >
                      <img
                        alt="Delete Item"
                        loading="lazy"
                        width="25"
                        height="25"
                        decoding="async"
                        data-nimg="1"
                        style={{ color: "transparent" }}
                        src="./trash.svg"
                      />
                    </button>
                  </div>
                </div>
              ))}
              <span>
                <article className="mt-3 flex flex-col">
                  <div className="mb-3 h-5 text-center text-xs text-red-700"></div>
                  {!isCheckoutLoading ? (
                    <>
                      <button
                        onClick={handleCheckout}
                        type="button"
                        className="w-100 mr-2 inline-flex items-center justify-center rounded-md bg-emerald-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                      >
                        <div className="flex items-center justify-center">
                          Checkout
                        </div>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        disabled
                        type="button"
                        className="w-100 mr-2 inline-flex items-center justify-center rounded-md bg-emerald-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                      >
                        <div className="flex items-center justify-center">
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="mr-3 inline h-4 w-4 animate-spin text-white"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            />
                          </svg>
                          Proceeding to Checkout...
                        </div>
                      </button>
                    </>
                  )}
                  {/* </button> */}
                </article>
              </span>
            </div>
          )}

          {cart.length < 1 && isDropdownOpen && (
            <div className="absolute right-3 top-14 block w-80 flex-col rounded-md bg-white px-4 py-4 shadow-[0_5px_15px_0_rgba(0,0,0,.15)] md:right-9">
              <div className="p-5">You have no items in your cart</div>
            </div>
          )}
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default NavBar;
