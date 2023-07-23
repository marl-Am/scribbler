import { useShoppingCart } from "use-shopping-cart";
import CartItem from "./CartItem";
import CheckoutButton from "./CheckOutButton";


export default function ShoppingCart() {
  const { shouldDisplayCart, cartCount, cartDetails } = useShoppingCart();
  return (
    <>
      <div
        className={`absolute right-3 top-14 w-80 flex-col rounded-md bg-white px-4 py-4 shadow-[0_5px_15px_0_rgba(0,0,0,.15)] md:right-9 ${
          shouldDisplayCart ? "block" : "hidden"
        }`}
      >
        {cartCount && cartCount > 0 ? (
          <div>
            {Object.values(cartDetails ?? {}).map((entry) => (
              <CartItem key={entry.id} item={entry} />
            ))}
            <CheckoutButton />
          </div>
        ) : (
          <div className="p-5">You have no items in your cart</div>
        )}
      </div>
    </>
  );
}
