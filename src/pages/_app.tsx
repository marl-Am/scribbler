import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import Footer from "~/components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartProvider } from "use-shopping-cart";

import NavBar from "~/components/NavBar";
import { neobrutalism } from "@clerk/themes";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider
      {...pageProps}
      appearance={{
        baseTheme: neobrutalism,
      }}
    >
      <div className="flex min-h-screen flex-col overflow-hidden">
        <CartProvider
          mode="payment"
          cartMode="client-only"
          stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
          successUrl={`${
            process.env.NEXT_PUBLIC_URL as string
          }/purchase_successful`}
          cancelUrl={`${process.env.NEXT_PUBLIC_URL as string}/purchase_failed`}
          currency="USD"
          allowedCountries={["US"]}
          // Enables local storage
          shouldPersist={true}
        >
          <NavBar />
          <main className="">
            <Component {...pageProps} />
          </main>
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </CartProvider>
        <Footer />
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
