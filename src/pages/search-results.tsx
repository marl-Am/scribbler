import type { GetServerSideProps } from "next";

import Link from "next/link";
import Image from "next/image";

import { prisma } from "~/server/db";

type SearchResultsProps = {
  products: Array<{
    id: number;
    name: string;
    price: number;
    shortDescription: string;
    imageUrl: string;
    stock: number;
  }>;
};

export default function SearchResults({ products }: SearchResultsProps) {
  if (products.length === 0) {
    return (
      <div className="mb-24 mt-24 justify-center text-black">
        <Image
          className="my-element mb-12 pt-0"
          src={"/assets/SearchError.svg"}
          alt={"Nothing found"}
          width={75}
          height={75}
        />
        <h1 className="mb-2 mt-2 text-center">
          We couldn’t find a match for your search.
        </h1>
      </div>
    );
  }

  return (
    <div className="mb-24 mt-24 justify-center text-black">
      <h1 className="mb-2 mt-2 text-center">Search Results</h1>
      {products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.shortDescription}</p>
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="scale-10 object-cover ease-in-out group-hover:opacity-75"
            width={350}
            height={350}
            loading="lazy"
          />
          <p>Price: {product.price}</p>
          <p>Stock: {product.stock}</p>
        </Link>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context.query;
  const queryStr = query as string;

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: queryStr,
      },
    },
  });

  return { props: { products } };
};
