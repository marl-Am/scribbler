import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { products } from "~/data/products";

import Image from "next/image";
import Head from "next/head";
import Product from "~/components/Product";

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
}

export default function SearchResults() {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    if (router.query.term) {
      const term = router.query.term.toString();
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [router.query]);

  const renderSearchResults = () => {
    if (searchResults.length) {
      return (
        <>
          <Head>
            <title>Item Found</title>
          </Head>
          <div className="bg-gray-100">
            <h2 className="text-center font-bold">Search Results</h2>
            <div className="place-center w-100 b-8 mx-auto mt-8 grid flex-wrap justify-center gap-4 sm:grid-cols-2 md:max-w-[900px] md:grid-cols-4">
              {searchResults.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Head>
            <title>Item Not Found</title>
          </Head>
          <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <Image
              className="my-element pt-0"
              src={"/SearchError.svg"}
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
  };

  return <div>{renderSearchResults()}</div>;
}
