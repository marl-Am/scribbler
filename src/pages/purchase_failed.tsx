import Head from "next/head";
import Link from "next/link";

export default function PurchaseFailed({}) {
  return (
    <>
      <div>
        <Head>
          <title>Failed Purchase</title>
        </Head>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-600">
            Purchase Failed
          </h1>
          <p className="mb-4">
            Unfortunately, there was an issue processing your order. Please
            check your payment details and try again.
          </p>
          <Link
            href="/"
            className="rounded bg-red-500 px-8 py-2 font-bold text-white hover:bg-red-600"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </>
  );
}
