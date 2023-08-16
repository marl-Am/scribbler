import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "./_base";


export default async function getProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const products = await prisma.product.findMany();
    // res.json({ results: products });
    res.status(200).json({ results: products });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching products.");
  }
}
