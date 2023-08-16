import type { NextApiRequest, NextApiResponse } from "next";
import stripe from "../base/_base";
import type Stripe from "stripe";
import { saveOrder } from "../orders/saveOrder";
import type { CartItem } from "~/context/CartContext";
import { buffer } from "micro";

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const rawBody = (await buffer(req)).toString();
    if (rawBody) {
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
      console.log("rawBody not a string.");
      return;
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
      return res.status(400).send("Webhook Error");
    }

    // Successfully constructed event.
    // console.log(`✅ Success event id: ${event.id}`);

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);
      // console.log("-----------------------------------------------------");

      console.log("\npaymentIntent: \n", paymentIntent, "\n");

      if (paymentIntent.metadata) {
        const userId = paymentIntent.metadata.userId;
        const cartItemsString = paymentIntent.metadata.cart;

        if (!userId) {
          console.log("\nUser Id is missing\n");
          return;
        }

        if (!cartItemsString) {
          console.log("\nCart Items String is missing\n");
          return;
        }

        if (userId && cartItemsString) {
          const cartItems: CartItem[] = JSON.parse(
            cartItemsString
          ) as CartItem[];

          // console.log("\nuserId: \n", userId, "\n");
          // console.log("\ncartItemsString: \n", cartItemsString, "\n");

          try {
            await saveOrder(userId, cartItems);
            // console.log("\nSaving order\n", order, "\n");
            res.status(200).send("Success");
          } catch (err) {
            // console.log("\nError saving order\n", err, "\n");
            res.status(500).send("Error saving order");
          }
        } else {
          // console.log("\nuserId or cartItemsString missing in metadata\n");
          res.status(400).send("Bad Request");
        }
      } else {
        // console.log("Metadata is null");
        res.status(400).send("Bad Request");
      }
    } else if (event.type === "payment_intent.payment_failed") {
      // const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log("❌ Payment failed.");
    }
  }
};

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handleRequest;
