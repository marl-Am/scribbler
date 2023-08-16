import type { CartItem } from "~/context/CartContext";
import prisma from "../prisma/_base";

export const saveOrder = async (userId: string, cartItems: CartItem[]) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const order = await prisma.order.create({
    data: {
      userId,
      total,
      orderItems: {
        create: cartItems.map((item) => ({
          name: item.name,
          quantity: 1,
          price: item.price,
          productId: item.id,
        })),
      },
    },
  });

  return order;
};
