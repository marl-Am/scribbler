import { useRouter } from "next/router";

import Head from "next/head";
import { api } from "~/utils/api";

import { useUser } from "@clerk/nextjs";

import Navbar from "~/components/navbar/Navbar";
import Cart from "~/components/cart/Cart";
import Dashboard from "~/components/dashboard/Dashboard";
import Landing from "~/components/landing/Landing";
import Footer from "~/components/footer/Footer";

export default function Home() {
  const router = useRouter();

  const MainContent = () => {
    if (router.pathname === "/cart") {
      return <Cart />;
    } else if (router.pathname === "/dashboard") {
      return <Dashboard />;
    } else if (router.pathname === "/") {
      return <Landing />;
    } else {
      return (
        <>
          <h1>Router Error</h1>
        </>
      );
    }
  };

  return (
    <>
      <Navbar />
      <main className="mt-24">
        <MainContent />
      </main>
      <Footer />
    </>
  );
}
// runs on our device
