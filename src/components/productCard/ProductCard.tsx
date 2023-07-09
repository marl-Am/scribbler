import React from "react";
import Link from "next/link";

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

  return (
    <div className="group">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-7 relative w-full cursor-pointer overflow-hidden rounded-lg bg-gray-200">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="scale-110 object-cover ease-in-out group-hover:opacity-75 "
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
          <h3>{product.name}</h3>

          <p>${product.price}</p>
          {/* <button className="add-btn">Add to Cart</button> */}
        </div>
        <p className="text-base font-medium text-gray-900">
          {product.shortDescription}
        </p>
        {/* <button className="add-btn mt-1 w-full">Add to Cart</button> */}
      </Link>
    </div>
  );
};

export default ProductCard;
