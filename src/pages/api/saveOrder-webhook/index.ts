import type { NextApiRequest, NextApiResponse } from "next";
import stripe from "../base/_base";
import type Stripe from "stripe";
import { saveOrder } from "../orders/saveOrder";
import type { CartItem } from "~/context/CartContext";

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const sig = req.headers["stripe-signature"] as string;
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET as string;

    if (!sig || !endpointSecret) {
      console.log("\nSignature is null or empty. ");
      console.log("Endpoint secret is null or empty.\n");
      return;
    }

    if (typeof req.body !== "string") {
      console.log("\nRequets body, not string. ");
      return;
    }


    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.log("Webhook Error: \n", err, "\n");
      return res.status(400).send("Webhook Error");
    }
    if (event.type === "payment_intent.succeeded") {
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