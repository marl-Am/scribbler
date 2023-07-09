import { useRouter } from "next/router";

import Head from "next/head";
import { api } from "~/utils/api";

import { useUser } from "@clerk/nextjs";

import Navbar from "~/components/navbar/Navbar";
import Cart from "~/components/cart/Cart";
import Dashboard from "~/components/dashboard/Dashboard";
import Footer from "~/components/footer/Footer";
import ProductCard from "~/components/products/ProductCard";

export default function Home() {
  const router = useRouter();

  const MainContent = () => {
    if (router.pathname === "/cart") {
      return <Cart />;
    } else if (router.pathname === "/dashboard") {
      return <Dashboard />;
    } else {
      return (
        <>
          <h1>Router Error</h1>
        </>
      );
    }
  };

  const data = [
    {
      id: 1,
      name: "Product 1",
      price: 49.99,
      shortDescription: "This is a short description of Product 1",
      imageUrl: "/assets/product-image.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 59.99,
      shortDescription: "This is a short description of Product 2",
      imageUrl: "/assets/product-image.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      price: 39.99,
      shortDescription: "This is a short description of Product 3",
      imageUrl: "/assets/product-image.jpg",
    },
    {
      id: 4,
      name: "Product 4",
      price: 29.99,
      shortDescription: "This is a short description of Product 4",
      imageUrl: "/assets/product-image.jpg",
    },
    {
      id: 5,
      name: "Product 5",
      price: 89.99,
      shortDescription: "This is a short description of Product 5",
      imageUrl: "/assets/product-image.jpg",
    },
    {
      id: 6,
      name: "Product 6",
      price: 19.99,
      shortDescription: "This is a short description of Product 6",
      imageUrl: "/assets/product-image.jpg",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="mt-24">
        <div className="mb-6 ml-2 mr-2 mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data &&
            data.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
// runs on our device
