import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { useCart } from "~/context/CartContext";

import { ToastContainer, toast } from "react-toastify";


interface Product {
  id: number;
  name: string;
  price: number;
  shortDescription: string;
  imageUrl: string;
  stock: number;
}

function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  const { cart, addToCart, removeFromCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const atcBtnStyle = isLoading
    ? `pt-3 pb-2 bg-blue-500 text-white w-full mt-2 rounded-sm font-semibold text-xl flex justify-center items-baseline hover:bg-blue-700 opacity-25 cursor-none`
    : `pt-3 pb-2 bg-blue-500 text-white w-full mt-2 rounded-sm font-semibold text-xl flex justify-center items-baseline hover:bg-blue-700`;

  useEffect(() => {
    if (typeof id === "string") {
      fetch(`/api/product/${id}`)
        .then((response) => response.json())
        .then((data) => setProduct(data as Product))
        .catch((error) => {
          console.error("Failed to fetch product: ", error);
        });
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (product: Product) => {
    setIsLoading(true);
    addToCart(product);
    toast("Item Added To Cart");
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mt-24 flex flex-grow text-black">
        <div className="image-div ml-4 mr-4 w-1/2">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={650}
            height={650}
          />
        </div>

        <div className="details-div ml-4 mr-4 flex w-1/2 flex-col justify-between text-2xl">
          <div>
            <h1 className="text-4xl">{product.name}</h1>
            <hr className="mb-4 mt-4"></hr>
            <p>${product.price}</p>
            <p>{product.shortDescription}</p>
          </div>
          <button
            className={atcBtnStyle}
            aria-label="cart-button"
            onClick={() => handleAddToCart(product)}
          >
            Add
            <FontAwesomeIcon icon={faShoppingCart} className="ml-2 w-5" />
          </button>
        
          {/* <button
            onClick={() => removeFromCart(product.id)}
            className="rounded-lg bg-red-500 px-4 py-2 text-white transition duration-200 hover:bg-red-700"
          >
            Delete <FontAwesomeIcon icon={faTrash} className="ml-1" />
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
