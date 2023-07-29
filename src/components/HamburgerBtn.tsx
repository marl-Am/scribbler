import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import router from "next/router";
import { useRef, useState } from "react";

export default function HamburgerBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
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
        .push(`/search-results?term=${searchTerm}`)
        .then(() => dialogRef.current?.close())
        .catch((err) => console.log(err));
    }
  };

  const closeDialog = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    dialogRef.current?.close();
  };

  return (
    <>
      <div className="dropdown relative gap-2">
        <button
          className="group z-10 flex h-10 w-10 flex-col items-center justify-center rounded border-2 border-black"
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
        </button>
        {isOpen && (
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <Link
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              
            >
              Home
            </Link>

            {user.isSignedIn && (
              <>
                <Link
                  href="/inbox"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  
                >
                  Inbox
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  
                >
                  Orders
                </Link>
                <Link
                  href="/user_details"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  
                >
                  User Details
                </Link>
              </>
            )}
            <Link
              href="/view_order"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              View Order
            </Link>
            <button
              className="block px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 lg:hidden"
              onClick={() => dialogRef.current?.showModal()}
            >
              Search
            </button>

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

              <h3 className="text-center text-lg font-bold">Find Item(s)</h3>
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
    </>
  );
}
