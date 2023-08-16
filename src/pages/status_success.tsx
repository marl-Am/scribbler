import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { CartContext } from "~/context/CartContext";

export default function PurchaseSuccessful({}) {
  const cartContext = useContext(CartContext);
  const clearCart = cartContext?.clearCart;
  const myCart = cartContext?.cart;

  useEffect(() => {
    if (myCart && myCart.length > 0) {
      clearCart?.();
    }
  }, [clearCart, myCart]);

  return (
    <>
      <div>
        <Head>
          <title>Successful Purchase</title>
        </Head>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center">
          <h1 className="mb-4 text-2xl font-bold text-green-600">Thank You!</h1>
          <p className="mb-4">
            Thank you for your purchase! We&apos;ve received your order and will
            begin processing it shortly.
          </p>
          <Link
            href="/"
            className="rounded bg-green-500 px-8 py-2 font-bold text-white hover:bg-green-600"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </>
  );
}
