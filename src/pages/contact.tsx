import Head from "next/head";
import Link from "next/link";

function ContactUs() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="mb-6 text-center text-3xl font-bold">Contact Us</h1>

        <div className="mb-4 flex flex-col items-center">
          <Link
            href="mailto:mamedee001@gmail.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            <svg
              className="h-6 w-6 text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 19"
            >
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
