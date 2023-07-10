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


const imageStyle = {
  maxWidth: "100%",
  height: "auto",
};

const ProductCard: React.FC<ProductProps> = ({ product }) => {

  return (
    <div className="group">
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden rounded-lg bg-black">
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="scale-10 object-cover ease-in-out group-hover:opacity-75"
            style={imageStyle}
            width={350}
            height={350}
            loading="lazy"
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
