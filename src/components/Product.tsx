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
  const { addItem } = useShoppingCart();
  const { name, price, image } = product;
  const [quantity, setQuantity] = useState(1);

  // const decreaseQuantity = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  // const increaseQuantity = () => {
  //   setQuantity(quantity + 1);
  // };

  const addToCart = () => {
    addItem(product, { count: quantity });
    setQuantity(1);
    toast(`${product.name}` + ", Added To Cart");
  };

  return (
    <article className="mb-6 flex flex-col gap-3 rounded-xl bg-white p-8 text-center shadow-md">
      <Image
        src={image}
        className="text-4xl"
        alt={name}
        width={205}
        height={170}
      ></Image>
      <div className="text-lg">{name}</div>
      <div className="mt-auto text-2xl font-semibold">
        {formatCurrencyString({ value: price, currency: "USD" })}
      </div>
      {/* <span className="mx-3 w-10 rounded-md text-center">{quantity}</span> */}
      <button
        onClick={() => addToCart()}
        className="rounded-md bg-emerald-50 px-5 py-2 text-emerald-500 transition-colors duration-500 hover:bg-emerald-500 hover:text-white"
      >
        Add to cart
      </button>
    </article>

  );
}
