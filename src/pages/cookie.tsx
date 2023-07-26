import Head from "next/head";

function About() {
  return (
    <>
      <Head>
        <title>Cookie Policy</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="mb-6 text-center text-3xl font-bold">Cookie Policy</h1>

        <div className="px-6 text-center">
          <p className="mb-4">
            Our website, <span className="font-bold">Scribbler</span>, uses
            cookies to improve your user experience. We use cookies to remember
            log-in details and provide secure log-in, collect statistics to
            optimize site functionality, and deliver content tailored to your
            interests.
          </p>

          <p className="mb-4">
            A cookie is a small piece of data that a website asks your browser
            to store on your computer or mobile device. The cookie allows the
            website to "remember" your actions or preferences over time.
          </p>

          <p className="mb-4">
            If you want to delete any cookies that are already on your computer,
            please refer to the help and support area on your internet browser
            for instructions on how to locate the file or directory that stores
            cookies.
          </p>

          <p>
            Please note that by deleting our cookies or disabling future
            cookies, you may not be able to access certain areas or features of
            our site. To learn more about how we use cookies and to change your
            cookie settings, click on the different category headings below.
          </p>
        </div>
      </div>
    </>
  );
}

export default About;
