

export default function Hero() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Discover a New World of Pre-loved Treasures
            </h1>
            <p className="mb-5">
              Discover pre-owned items that are anything but ordinary.
              They&apos;ve been loved before and are ready for a rerun. Who said
              old can&apos;t be gold? Jump in, start digging and grab the best
              deals!
            </p>
            <span className="get-started">Get Started</span>
          </div>
        </div>
      </div>
    </>
  );
}
