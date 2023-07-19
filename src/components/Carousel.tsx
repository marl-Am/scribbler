export default function Carousel() {
  return (
    <>
      <div className="carousel-center carousel h-72 w-full space-x-4 bg-neutral p-4">
        <div id="slide1" className="carousel-item relative w-full">
          <img src="/image1.jpg" className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn-circle btn">
              ❮
            </a>
            <a href="#slide2" className="btn-circle btn">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src="/image2.jpg" className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn-circle btn">
              ❮
            </a>
            <a href="#slide3" className="btn-circle btn">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src="/image3.jpg" className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn-circle btn">
              ❮
            </a>
            <a href="#slide4" className="btn-circle btn">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img src="/image4.jpg" className="w-full" />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn-circle btn">
              ❮
            </a>
            <a href="#slide1" className="btn-circle btn">
              ❯
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
