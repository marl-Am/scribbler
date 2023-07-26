import Head from "next/head";

function About() {
  return (
    <>
      <Head>
        <title>About Me</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="mb-6 text-center text-3xl font-bold">About Me</h1>
        <p className="px-6 text-center">
          Hello! I&apos;m a passionate Software Engineer with a love for coding,
          technology, and problem-solving. Over the years, I&apos;ve collected
          an assortment of items, some tech-related, others not. As much as
          I&apos;ve enjoyed them, it&apos;s time to pass them on to others who
          might find value in them. That&apos;s why I&apos;ve created this
          store, to give these items a new home. Thank you for visiting, and I
          hope you find something that catches your eye!
        </p>
      </div>
    </>
  );
}

export default About;
