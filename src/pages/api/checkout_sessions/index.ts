import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";
import stripe from "../base/_base";
import { transformItems } from "../transformItems";

interface CartItem {
  id: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
}

interface CheckoutRequest {
  userId: string;
  itemsToOrder: CartItem[];
}

export default async function handler(
  req: NextApiRequest & { body: CheckoutRequest },
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (req.body) {
      
      const { userId, itemsToOrder } = req.body as CheckoutRequest;

      const transformedItems = transformItems(itemsToOrder);

      const origin = req.headers.origin;
      if (typeof origin !== "string") {
        console.error("Invalid origin");
        return;
      }

      try {
        const params: Stripe.Checkout.SessionCreateParams = {
          payment_method_types: ["card"],
          shipping_address_collection: {
            allowed_countries: ["US"],
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: 1500,
                  currency: "usd",
                },
                display_name: "Standard Shipping",
                delivery_estimate: {
                  minimum: {
                    unit: "business_day",
                    value: 6,
                  },
                  maximum: {
                    unit: "business_day",
                    value: 10,
                  },
                },
              },
            },
          ],
          line_items: transformedItems,
          mode: "payment",
          success_url: `${origin}/status_success`,
          cancel_url: `${origin}/status_cancel`,
          metadata: {
            userId: userId,
            cart: JSON.stringify(itemsToOrder),
          },
        };

        const checkoutSession: Stripe.Checkout.Session =
          await stripe.checkout.sessions.create(params);

        res.status(200).json(checkoutSession);
      } catch (err) {
        console.log(err);
        const errorMessage =
          err instanceof Error ? err.message : "Internal server error";
        res.status(500).json({ statusCode: 500, message: errorMessage });
      }
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
