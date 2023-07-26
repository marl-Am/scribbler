import Head from "next/head";
import Link from "next/link";

export default function Forbidden() {
  return (
    <>
      <Head>
        <title>Access Forbidden</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="mt-2 text-3xl text-black">
          Access to the requested resource is forbidden.
        </h1>
        <Link href="/" className="mt-4 text-indigo-600 hover:text-indigo-800">
          Go back to Home
        </Link>
      </div>
    </>
  );
}
