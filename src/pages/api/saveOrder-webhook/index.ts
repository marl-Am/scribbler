import type { NextApiRequest, NextApiResponse } from "next";
import stripe from "../base/_base";
import type Stripe from "stripe";
import { saveOrder } from "../orders/saveOrder";
import type { CartItem } from "~/context/CartContext";
import { buffer } from "micro";

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const rawBody = (await buffer(req)).toString();
    if (rawBody){
      console.log("Error saving order\n", rawBody, "\n");
    }

    const sig = req.headers["stripe-signature"] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

    if (!sig) {
      console.log("\nSignature is null or empty ");
      return;
    }

    if (!endpointSecret) {
      console.log("Endpoint secret is null or empty.\n");
      return;
    }

    if (typeof rawBody !== "string") {
      console.log("req: NextApiRequest body, not string.");
      return;
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
      return res.status(400).send("Webhook Error");
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntentSucceeded = event.data
        .object as Stripe.Checkout.Session;

        console.log(
          "\npaymentIntentSucceeded: \n",
          paymentIntentSucceeded,
          "\n"
        );

      if (paymentIntentSucceeded.metadata) {

        console.log(
          "\npaymentIntentSucceeded.metadata: \n",
          paymentIntentSucceeded.metadata
        ,"\n");
        
        const userId = paymentIntentSucceeded.metadata.userId;
        const cartItemsString = paymentIntentSucceeded.metadata.cart;

        if (!userId) {
          console.log("\nuserId is missing\n");
        }

        if (!cartItemsString) {
          console.log("\ncartItemsString is missing\n");
        }

        if (userId && cartItemsString) {
          const cartItems: CartItem[] = JSON.parse(
            cartItemsString
          ) as CartItem[];

          console.log("\nuserId: \n", userId, "\n");

          console.log("\ncartItemsString: \n", cartItemsString, "\n");

          try {
            const order = await saveOrder(userId, cartItems);
            res.status(200).send("Success");
          } catch (err) {
            console.log("\nError saving order\n", err, "\n");
            res.status(500).send("Error saving order");
          }
        } else {
          console.log("\nuserId or cartItemsString missing in metadata\n");
          res.status(400).send("Bad Request");
        }
      } else {
        console.log("Metadata is null");
        res.status(400).send("Bad Request");
      }
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handleRequest;