import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { useCart } from "~/context/CartContext";

import { toast } from "react-toastify";

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

  const { addToCart } = useCart();

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
    addToCart(product);
    toast("Item Added To Cart");
  };

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <div>
        <div className="-mx-5 ml-4 mr-4 flex flex-col justify-between pb-24 pt-16 lg:flex-row">
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
              <div className="border-grey-dark mb-8 border-b">
                <div className="flex items-center">
                  <h2 className="font-butler lg:text-4.5xl text-3xl md:text-4xl">
                    {product.name}
                  </h2>
                </div>

                <div className="flex items-center pt-3">
                  <span className="font-hk text-2xl text-secondary">
                    ${product.price}
                  </span>
                </div>
              </div>

              <div className="flex pb-5">
                <p className="font-hk text-secondary">Availability:</p>
                <p className="font-hkbold pl-3">
                  <div
                    className={`${
                      product.stock == 1 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {product.stock == 1 ? "In Stock" : "Out of Stock"}
                  </div>
                </p>
              </div>

              <div>
                <h4 className="tab-item font-hk hover:bg-grey-light bg-white px-0 py-5 text-center font-bold text-secondary sm:text-left">
                  Description
                </h4>
                <p className="font-hk pb-5 text-secondary">
                  {product.shortDescription}
                </p>
              </div>

              <div className="group flex pb-8">
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`btn-outline btn mr-4 md:mr-6 ${
                    product.stock === 1 ? "" : "disabled"
                  }`}
                  disabled={product.stock !== 1}
                >
                  {product.stock === 1 ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
