import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "./_base";

interface GetUserOrdersRequest {
  userId: string;
}

export default async function getUserOrders(
  req: NextApiRequest & { body: GetUserOrdersRequest },
  res: NextApiResponse
) {
  const { userId } = req.body as GetUserOrdersRequest;

  if (!userId) {
    return res.status(400).send("User ID must be provided");
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).send("An error occurred while fetching orders");
  } finally {
    await prisma.$disconnect();
  }
}
