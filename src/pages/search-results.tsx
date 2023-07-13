import type { GetServerSideProps } from "next";

import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

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
      <>
        <Head>
          <title>Search Results</title>
        </Head>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <Image
            className="my-element pt-0"
            src={"/assets/SearchError.svg"}
            alt={"Nothing found"}
            width={100}
            height={100}
          />
          <h1 className="mt-2 text-black">
            We couldn’t find a match for your search.
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      {/* <h1 className="mb-2 mt-2 text-center text-white">Search Results</h1> */}
      <div className="mb-8 mt-8 flex flex-wrap justify-start gap-4 p-6">
        {products.map((product) => (
          <>
            <Link href={`/products/${product.id}`}>
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
        ))}
      </div>
    </>
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
