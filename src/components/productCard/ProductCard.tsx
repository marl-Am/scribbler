import React from "react";
import Link from "next/link";
import Image from "next/image";

type ProductProps = {
  product: {
    id: number;
    name: string;
    price: number;
    shortDescription: string;
    imageUrl: string;
    stock: number;
  };
};

const ProductCard: React.FC<ProductProps> = ({ product }) => {

  return (
    <>
      <Link href={`/products/${product.id}`} key={product.id}>
        <div className="card w-72 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <Image
              className="rounded-xl"
              src={product.imageUrl}
              alt={product.name}
              width={304}
              height={180}
              loading="lazy"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{product.name}</h2>
            <p>${product.price}</p>
            {/* <div className="card-actions">
              <button className="btn-primary btn">View</button>
            </div> */}
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;


