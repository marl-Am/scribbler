import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";

export default function Inbox({}) {
  const user = useUser();
  const router = useRouter();

  if (!user) {
    router
      .push("/")
      .then(() => {
        console.log("Unauthorized Access. Redirected to home page");
      })
      .catch((e) => console.error(e));
    return null;
  }

  return (
    <>
      <div>
        {user.isSignedIn && (
          <div>
            <Head>
              <title>Inbox</title>
            </Head>
            <div className="flex min-h-screen flex-col items-center justify-center">
              <h1 className="mt-2 text-3xl text-black">Inbox</h1>
            </div>
          </div>
        )}

        {!user.isSignedIn && (
          <div>
            <Head>
              <title>Access Forbidden</title>
            </Head>
            <div className="flex min-h-screen flex-col items-center justify-center">
              <h1 className="mt-2 text-3xl text-black">
                Access to the requested resource is forbidden.
              </h1>
              <Link
                href="/"
                className="mt-4 text-indigo-600 hover:text-indigo-800"
              >
                Go back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
