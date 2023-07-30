import { useState } from "react";
import { formatCurrencyString } from "use-shopping-cart";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import { toast } from "react-toastify";

interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    emoji: string;
    currency: string;
  };
}



export default function Product({ product }: ProductProps) {
  const { addItem, cartDetails } = useShoppingCart();
  const { name, price, image } = product;
  const [quantity, setQuantity] = useState(1);

  // Convert the value to boolean. If the item exists in cartDetails, it will be true, otherwise false.
  const isInCart = Boolean(cartDetails?.[product.id]);

  const addToCart = () => {
    addItem(product, { count: quantity });
    setQuantity(1);
    toast("Added To Cart: " + `${product.name}`);
  };

  return (
    <article className="mb-6 flex flex-col gap-3 rounded-xl bg-white p-8 text-center shadow-md">
      <Image
        src={image}
        className="text-3xl"
        alt={name}
        width={200}
        height={150}
      ></Image>
      <div className="text-md">{name}</div>
      <div className="mt-auto text-2xl font-semibold">
        {formatCurrencyString({ value: price, currency: "USD" })}
      </div>
      {/* <span className="mx-3 w-10 rounded-md text-center">{quantity}</span> */}
      <button
        onClick={() => addToCart()}
        disabled={isInCart}
        className={
          isInCart
            ? "cursor-not-allowed rounded-md bg-gray-500 px-5 py-2 text-white"
            : "rounded-md bg-emerald-500 px-5 py-2 text-white transition-colors duration-500 hover:bg-emerald-600"
        }
      >
        {isInCart ? "Out of Stock" : "Add to Cart"}
      </button>
      

      {/* <button className="rounded-md bg-blue-500 px-5 py-2 text-white transition-colors duration-500 hover:bg-blue-600">
        Buy Now
      </button> */}
    </article>
  );
}
