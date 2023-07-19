// import Carousel from "~/components/Carousel";
import Product from "~/components/Product";
import { products } from "~/data/products";
import Head from "next/head";
import Hero from "~/components/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {/* <div className="flex items-center justify-center">
        <Hero/>
      </div> */}
      {/* <Hero /> */}
      <div className="">
        <div className="center-this mx-auto mt-2 justify-center">
          <Hero />
          <section id="shipping" className="bg-black py-4 text-center">
            <div className="container">
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 md:w-1/4">
                  <div className="shipping-box mb-4 ml-2 mr-2 rounded bg-blue-900 p-4">
                    <div className="box-title ml-4 inline-grid">
                      <h3 className="text-md font-bold text-white">
                        Standard&nbsp;Shipping
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="w-full px-4 md:w-1/4">
                  <div className="shipping-box mb-4 ml-2 mr-2 rounded bg-blue-900 p-4">
                    {/* <div className="box-icon inline-block">
                    <i className="far fa-address-book text-3xl text-green-600"></i>
                  </div> */}
                    <div className="box-title ml-4 inline-grid">
                      <h3 className="text-md font-bold text-white">
                        Used&nbsp;Items
                      </h3>
                      {/* <p className="text-white">100% guarantee</p> */}
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/4">
                  <div className="shipping-box mb-4 ml-2 mr-2 rounded bg-blue-900 p-4">
                    {/* <div className="box-icon inline-block">
                    <i className="far fa-money-bill-alt text-3xl text-green-600"></i>
                  </div> */}
                    <div className="box-title ml-4 inline-grid">
                      <h3 className="text-md font-bold text-white">
                        Huge&nbsp;Savings
                      </h3>
                      {/* <p className="text-white">at lowest price</p> */}
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/4">
                  <div className="shipping-box mb-4 ml-2 mr-2 rounded bg-blue-900 p-4">
                    {/* <div className="box-icon inline-block">
                    <i className="fas fa-recycle text-3xl text-green-600"></i>
                  </div> */}
                    <div className="box-title ml-4 inline-grid">
                      <h3 className="text-md font-bold text-white">
                        No&nbsp;Returns
                      </h3>
                      {/* <p className="text-white">no questions asked</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <article className="flex justify-center">
          <ul className="mb-2 ml-2 mr-2 mt-4 flex flex-wrap gap-4">
            <li className="get-started cursor-pointer hover:bg-black hover:text-white">
              All
            </li>
            <li className="get-started cursor-pointer hover:bg-black hover:text-white">
              Books
            </li>
            <li className="get-started cursor-pointer hover:bg-black hover:text-white">
              Clothes
            </li>
            <li className="get-started cursor-pointer hover:bg-black hover:text-white">
              Electronics
            </li>
            <li className="get-started cursor-pointer hover:bg-black hover:text-white">
              Games
            </li>
            <li className="get-started cursor-pointer hover:bg-black hover:text-white">
              Sort Price -
            </li>
            <li className="get-started cursor-pointer hover:bg-black hover:text-white">
              Sort Price +
            </li>
          </ul>
        </article>
        <div className="place-center w-100 b-8 mx-auto mt-8 grid flex-wrap justify-center gap-4 sm:grid-cols-2 md:max-w-[900px] md:grid-cols-4">
          {products.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
        <div className="flex justify-center">
          <div className="join mb-2 gap-2">
            <input
              className="btn-square join-item btn"
              type="radio"
              name="options"
              aria-label="1"
              checked
            />
            <input
              className="btn-square join-item btn"
              type="radio"
              name="options"
              aria-label="2"
            />
            <input
              className="btn-square join-item btn"
              type="radio"
              name="options"
              aria-label="3"
            />
            <input
              className="btn-square join-item btn"
              type="radio"
              name="options"
              aria-label="4"
            />
          </div>
        </div>
      </div>
    </>
  );
}
