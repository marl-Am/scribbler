import Head from "next/head";
import Link from "next/link";

function NotFound() {
  return (
    <>
      <Head>
        <title>Not Found</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="mt-2 text-3xl text-black">Page not found.</h1>
        <Link href="/" className="mt-4 text-indigo-600 hover:text-indigo-800">
          Go back to Home
        </Link>
      </div>
    </>
  );
}

export default NotFound;
