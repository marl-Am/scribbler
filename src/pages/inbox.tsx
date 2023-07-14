import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import Head from "next/head";

export default function Inbox({}) {
  const user = useUser();
  const router = useRouter();

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Head>
        <title>Inbox</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mt-2 text-3xl text-black">Inbox</h1>
      </div>
    </>
  );
}
