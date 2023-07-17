import Product from "~/components/Product";
import { products } from "~/data/products";

export default function Home() {
  return (
    <div className="place-center w-100 b-8 mx-auto mt-8 grid flex-wrap justify-center gap-4 sm:grid-cols-2 md:max-w-[900px] md:grid-cols-4">
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
}
