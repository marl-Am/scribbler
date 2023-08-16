import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import Footer from "~/components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "~/components/NavBar";
import { neobrutalism } from "@clerk/themes";
import { CartProvider } from "~/context/CartContext";


const MyApp: AppType = ({ Component, pageProps }) => {


  return (
    <ClerkProvider
      {...pageProps}
      appearance={{
        baseTheme: neobrutalism,
      }}
    >
      <CartProvider>
        <div className="flex min-h-screen flex-col overflow-hidden">
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
          <Footer />
        </div>
      </CartProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
