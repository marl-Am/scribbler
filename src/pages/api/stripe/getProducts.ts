// import Stripe from "stripe";
// import { NextApiRequest, NextApiResponse } from "next";

// // Define an async function named handler that takes a request object as a parameter and returns a Promise of type NextResponse
// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   // Create a new instance of the Stripe class, passing in the Stripe secret key and an optional configuration object
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//     apiVersion: "2022-11-15",
//   });

//   try {

//     const products = await stripe.products.list({
//       limit: 3,
//     });

//     // Return a new NextResponse object with a status code of 200 and the reversed list of prices as the body
//     return res.status(200).json(products.data);
//   } catch (error) {
//     // If an error occurs, return a new NextResponse object with a status code of 500 and the error as the body
//     return res.status(500).json(error);
//   }
// };

// export default handler;
