import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

interface CheckoutResponse {
  error?: unknown;
}

export default function CheckoutButton() {
  const [status, setStatus] = useState("idle");
  const { redirectToCheckout, cartCount, totalPrice } = useShoppingCart();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setStatus("loading");
    void handleCheckout();
  }

  async function handleCheckout() {
    if ((cartCount || 0) > 0) {
      setStatus("loading");
      try {
        const result = (await redirectToCheckout().catch((error: unknown) => {
          console.error(error);
          return { error };
        })) as CheckoutResponse;

        if (result?.error) {
          console.error(result);
          setStatus("redirect-error");
        }
      } catch (error) {
        console.error(error);
        setStatus("redirect-error");
      }
    } else {
      setStatus("no-items");
    }
  }

  return (
    <article className="mt-3 flex flex-col">
      <div className="mb-3 h-5 text-center text-xs text-red-700">
        {totalPrice && totalPrice < 899
          ? "You must have at least $8.99 in your basket"
          : cartCount && cartCount > 20
          ? "You cannot have more than 20 items"
          : status === "redirect-error"
          ? "Unable to redirect to Stripe checkout page"
          : status === "no-items"
          ? "Please add some items to your cart"
          : null}
      </div>
      <button
        onClick={handleClick}
        className="w-100 rounded-md bg-emerald-50 px-5 py-3 text-emerald-500 transition-colors duration-500 hover:bg-emerald-500 hover:text-white disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-white"
        disabled={
          (totalPrice && totalPrice < 30) ||
          (cartCount && cartCount > 20) ||
          status == "no-items"
            ? true
            : false
        }
      >
        {status === "loading" ? "Loading..." : "Proceed to checkout"}
      </button>
    </article>
  );
}
