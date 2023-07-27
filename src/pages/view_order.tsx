import Head from "next/head";
import React, { useState } from "react";

export default function ViewOrder() {
  const [orderNumber, setOrderNumber] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (orderNumber) {
      // router
      //   .push(`/search-results?term=${searchTerm}`)
      //   .then(() => dialogRef.current?.close())
      //   .catch((err) => console.log(err));
      console.log("Order number: " + orderNumber);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setOrderNumber(event.target.value);
  };

  return (
    <>
      <Head>
        <title>View Order</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="mt-2 text-center text-2xl font-bold text-black">
          View Order
        </h1>

        {/* Form */}
        <div>
          <form className="modal-box bg-black" onSubmit={handleSubmit}>
            {/* <button
              className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2"
              onClick={closeDialog}
            >
              ✕
            </button> */}

            {/* <h3 className="text-center text-lg font-bold">Find Order</h3> */}
            <div className="flex justify-center">
              <input
                className=" input-info input w-full max-w-xs bg-gray-700 text-gray-200"
                type="search"
                placeholder="Enter order number"
                onChange={handleChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleSubmit(event);
                  }
                }}
                autoFocus
                required
              />

              <button
                className="btn ml-2 mr-2 hover:bg-purple-600 hover:text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="mb-2 mt-6">
          {/*Found Result */}
          {orderNumber && (
            <div>
              <div>Order: {orderNumber}</div>
            </div>
          )}

          {/*Not Found Result */}
          {/* {!orderNumber && (
            <div>
              <div>Order Not Found</div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}
