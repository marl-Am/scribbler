import { useAuth, useUser } from "@clerk/nextjs";
import Head from "next/head";
import Forbidden from "./403";

export default function UserDetails() {
  const { userId, sessionId } = useAuth();
  const { isSignedIn, user } = useUser();

  if (!user || !userId || !isSignedIn) {
    return <Forbidden />; // Return the Forbidden component if the user doesn't have access.
  }

  return (
    <>
      <Head>
        <title>User Details</title>
      </Head>
      <div>
        {isSignedIn && (
          <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <h1 className="mt-2 text-3xl text-black">
              Hello, {user?.username}.
            </h1>
            <h3 className="mt-2 font-bold">User Email(s):</h3>
            <ul>
              {user?.emailAddresses.map((email, index) => (
                <li key={index}>{email.emailAddress}</li>
              ))}
            </ul>
            <p className="font-bold">User Id: {userId}</p>
            <p className="font-bold">User Session Id: {sessionId}</p>
          </div>
        )}
      </div>
    </>
  );
}
