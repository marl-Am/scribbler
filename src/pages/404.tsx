import Error from "next/error";
import Head from "next/head";

function NotFound() {
  return (
    <>
      <Head>
        <title>Not Found</title>
      </Head>
      <Error statusCode={404} />
    </>
  );
}

export default NotFound;
