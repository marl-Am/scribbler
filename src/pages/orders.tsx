import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import Forbidden from "./403";

export default function Orders({}) {
 const { isSignedIn, user } = useUser();

 if (!user || !isSignedIn) {
   return <Forbidden />; // Return the Forbidden component if the user doesn't have access.
 }

  return (
    <>
      <div>
        {isSignedIn && (
          <div>
            <Head>
              <title>Orders</title>
            </Head>
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
              <h1 className="mt-2 text-3xl text-black">Orders</h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
