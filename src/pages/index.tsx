import Product from "~/components/Product";
import { products } from "~/data/products";

export default function Home() {
  return (
    <>
      <div className="mx-auto ml-2 mr-2 mt-2 justify-center">
        <section id="shipping" className="bg-black py-4 text-center">
          <div className="container">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4 md:w-1/4">
                <div className="shipping-box mb-4 ml-2 mr-2 rounded bg-blue-900 p-4">
                  {/* <div className="box-icon inline-block">
                    <i className="fas fa-truck text-3xl text-green-600"></i>
                  </div> */}
                  <div className="box-title ml-4 inline-grid">
                    <h3 className="text-md font-bold text-white">
                      Standard&nbsp;Shipping
                    </h3>
                    {/* <p className="text-white">above $ only</p> */}
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
      <div className="place-center w-100 b-8 mx-auto mt-8 grid flex-wrap justify-center gap-4 sm:grid-cols-2 md:max-w-[900px] md:grid-cols-4">
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </>
  );
}
