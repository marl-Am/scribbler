import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "~/components/navbar/Navbar";
import Footer from "~/components/footer/Footer";
import { CartProvider } from "~/context/CartContext";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Navbar />
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
      <Footer />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
