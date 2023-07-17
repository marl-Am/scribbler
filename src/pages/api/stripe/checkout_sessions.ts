// import Stripe from "stripe";
// import StripeError from "stripe";
// import { NextApiRequest, NextApiResponse } from "next";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2022-11-15",
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     try {
//       // Create Checkout Sessions from body params.
//       const origin = (req.headers.origin || "http://localhost:3000") as string;
//       const session = await stripe.checkout.sessions.create({
//         line_items: [
//           {
//             // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//             price: "price_1NUL3OBAPlcBoDEX9eBw8WFH",
//             quantity: 1,
//           },
//         ],
//         mode: "payment",
//         success_url: `${origin}/?success=true`,
//         cancel_url: `${origin}/?canceled=true`,
//       });
//       res.redirect(303, session.url as string);
//     } catch (e) {
//       const error = e as Error; // Type assertion

//       switch (
//         error.name // Access the name property instead of the type property
//       ) {
//         case "StripeCardError":
//           console.log(`A payment error occurred: ${error.message}`);
//           break;
//         case "StripeInvalidRequestError":
//           console.log("An invalid request occurred.");
//           break;
//         default:
//           console.log("Another problem occurred, maybe unrelated to Stripe.");
//           break;
//       }
//     }

//   } else {
//     res.setHeader("Allow", "POST");
//     res.status(405).end("Method Not Allowed");
//   }
// }
