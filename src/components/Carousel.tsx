import Image from 'next/image';

export default function Carousel() {
  return (
    <>
      {/*  */}
      <div className="carousel w-full">
        <div id="item1" className="carousel-item w-full">
          <Image
            src="/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
            alt="Item 1"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div id="item2" className="carousel-item w-full">
          <Image
            src="/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
            alt="Item 2"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div id="item3" className="carousel-item w-full">
          <Image
            src="/images/stock/photo-1414694762283-acccc27bca85.jpg"
            alt="Item 3"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div id="item4" className="carousel-item w-full">
          <Image
            src="/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
            alt="Item 4"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        <a href="#item1" className="btn-xs btn">
          1
        </a>
        <a href="#item2" className="btn-xs btn">
          2
        </a>
        <a href="#item3" className="btn-xs btn">
          3
        </a>
        <a href="#item4" className="btn-xs btn">
          4
        </a>
      </div>
      {/*  */}
    </>
  );
}
