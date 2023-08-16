
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "./_base";


export default async function searchProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const term = req.query.term;

  try {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: term as string,
        },
      },
    });
    res.status(200).json({ results: products });
    // res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while searching for products.");
  }
}
