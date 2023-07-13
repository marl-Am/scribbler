import ProductCard from "~/components/productCard/ProductCard";
import { prisma } from "~/server/db";
import NotFound from "./404";

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
      <div className="divider"></div>
      <main className="mb-8 mt-8 flex flex-wrap justify-center gap-4">
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
