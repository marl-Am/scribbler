import { useShoppingCart } from "use-shopping-cart";
import { useEffect } from "react";
import Head from "next/head";

export default function Success() {
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Head>
        <title>Success</title>
      </Head>
      <h1 className="mb-4 mt-4 items-center justify-center text-center">
        Your payment was successful. Thank you for your purchase.
      </h1>
    </>
  );
}
