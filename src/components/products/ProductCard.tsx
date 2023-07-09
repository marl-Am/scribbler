import React, { useState } from "react";
import Link from "next/link";
// import Image from "next/image";

type ProductProps = {
  product: {
    id: number;
    name: string;
    price: number;
    shortDescription: string;
    imageUrl: string;
  };
};

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="group">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-7 relative w-full cursor-pointer overflow-hidden rounded-lg bg-gray-200">
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`object-cover duration-700 ease-in-out group-hover:opacity-75 ${
              isLoading
                ? "scale-110 blur-2xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            }`}
            onLoad={() => setLoading(false)}
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
        <p className="mt-1 text-sm italic text-gray-500">
          {product.shortDescription}
        </p>
      </Link>
    </div>
  );
};

export default ProductCard;
