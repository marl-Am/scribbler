// import { useRouter } from "next/router";

// function ProductPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   // If the product data is still loading
//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{product.name}</h1>
//       <img src={product.imageUrl} alt={product.name} />
//       <p>Price: ${product.price}</p>
//       <p>{product.shortDescription}</p>
//     </div>
//   );
// }

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "~/components/navbar/Navbar";
import Footer from "~/components/footer/Footer";

interface Product {
  id: number;
  name: string;
  price: number;
  shortDescription: string;
  imageUrl: string;
}

function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Fetch product data based on id
    // This is just an example, you'll need to replace this with your own code to fetch the data
    fetch(`/api/product/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mt-24 flex flex-grow text-black">
        <div className="image-div ml-4 w-1/2">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={650}
            height={650}
          />
        </div>

        <div className="details-div mr-4 flex w-1/2 flex-col justify-between text-2xl">
          <div>
            <h1 className="text-4xl">{product.name}</h1>
            <hr className="mb-4 mt-4"></hr>
            <p>${product.price}</p>
            <p>{product.shortDescription}</p>
          </div>
          <button className="add-btn mt-1 w-full">Add to Cart</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductPage;

