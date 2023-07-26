import Head from "next/head";
import Link from "next/link";

function About() {
  return (
    <>
      <Head>
        <title>About Me</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="mb-6 text-center text-3xl font-bold">About Me</h1>

        <p className="px-6 text-center">
          Hello! I'm a passionate Software Engineer with a love for coding,
          technology, and problem-solving. Over the years, I've collected an
          assortment of items, some tech-related, others not. As much as I've
          enjoyed them, it's time to pass them on to others who might find value
          in them. That's why I've created this store, to give these items a new
          home. Thank you for visiting, and I hope you find something that
          catches your eye!
        </p>
      </div>
    </>
  );
}

export default About;
