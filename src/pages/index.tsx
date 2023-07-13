import ProductCard from "~/components/productCard/ProductCard";
import { prisma } from "~/server/db";
import NotFound from "./404";
import Head from "next/head";

interface HomeProps {
  data: {
    id: number;
    name: string;
    price: number;
    shortDescription: string;
    imageUrl: string;
    stock: number;
  }[];
}

export default function Home({ data }: HomeProps) {
  if (!data) return NotFound();

  return (
    <>
      {/* <div className="divider"></div> */}
      <Head>
        <title>Home</title>
      </Head>
      <main className="mb-8 mt-8 flex flex-wrap justify-start gap-4 p-6">
        {data &&
          data.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const data = await prisma.product.findMany();
  return {
    props: { data },
  };
}

// runs on our device
