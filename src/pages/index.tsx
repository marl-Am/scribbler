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
      <main className="mt-32">
        <div className="mb-6 ml-2 mr-2 mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data &&
            data.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
              />
            ))}
        </div>
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
