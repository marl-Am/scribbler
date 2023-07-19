import { useShoppingCart } from "use-shopping-cart";
import { formatCurrencyString } from "use-shopping-cart";
import Image from "next/image";

interface ItemProps {
  item: {
    id: string; // changed this to string
    name: string;
    price: number;
    currency: string;
  };
}

export default function CartItem({ item }: ItemProps) {
  const { name, price } = item;
  const { removeItem } = useShoppingCart();

  const removeItemFromCart = () => {
    removeItem(item.id); // item.id is now string
  };

  return (
    <div className="mb-3 flex items-center gap-4">
      <div className="overflow-hidden text-ellipsis text-xs">{name}</div>
      <div className="ml-auto">
        {formatCurrencyString({ value: price, currency: "USD" })}
      </div>
      <div className="ml-2 mr-2">
        <button
          onClick={() => removeItemFromCart()}
          className="h-10 w-10 rounded-full p-1 transition-colors duration-200 hover:bg-emerald-50"
        >
          <Image alt="delete icon" src="./trash.svg" width={25} height={25} />
        </button>
      </div>
    </div>
  );
}
