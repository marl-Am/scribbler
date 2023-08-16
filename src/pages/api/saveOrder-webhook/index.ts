import type { NextApiRequest, NextApiResponse } from "next";
import stripe from "../base/_base";
import type Stripe from "stripe";
import { saveOrder } from "../orders/saveOrder";
import type { CartItem } from "~/context/CartContext";
import captureRawBody from "~/middleware/captureRawBody";

interface NextApiRequestWithRawBody extends NextApiRequest {
  rawBody?: string;
}

const handleRequest = async (
  req: NextApiRequestWithRawBody,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    // Apply the middleware
    await captureRawBody(req);

    const sig = req.headers["stripe-signature"] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    // console.log("\n[req.body]:\n ", (req as any).rawBody, "\n");

    if (!sig || !endpointSecret) {
      console.log("\nSignature is null or empty. ");
      console.log("Endpoint secret is null or empty.\n");
      return;
    }

    if (typeof req.rawBody !== "string") {
      console.log("req: NextApiRequest body, not string.");
      return;
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
      //
      console.log("\nTrying event");
    } catch (err) {
      console.log("Webhook Error: \n", err, "\n");
      return res.status(400).send("Webhook Error");
    }
    if (event.type === "payment_intent.succeeded") {
      //
      console.log("\nThe payment_intent.succeeded");

      const paymentIntentSucceeded = event.data
        .object as Stripe.Checkout.Session;

      if (paymentIntentSucceeded.metadata) {
        const userId = paymentIntentSucceeded.metadata.userId;
        const cartItemsString = paymentIntentSucceeded.metadata.cart;

        if (userId && cartItemsString) {
          const cartItems: CartItem[] = JSON.parse(
            cartItemsString
          ) as CartItem[];

          try {
            const order = await saveOrder(userId, cartItems);
            console.log("Order saved:", order);
            res.status(200).send("Success");
          } catch (err) {
            console.log(err);
            res.status(500).send("Error saving order");
          }
        } else {
          console.log("userId or cartItemsString missing in metadata");
          res.status(400).send("Bad Request");
        }
      } else {
        console.log("Metadata is null");
        res.status(400).send("Bad Request");
      }
    }
  }
};

export default handleRequest;