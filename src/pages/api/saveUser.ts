/* eslint-disable @typescript-eslint/no-unsafe-assignment*/
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

interface RequestBody {
  clerkId: string | undefined;
  name: string | undefined;
  email: string | undefined;
}

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest & { body: RequestBody },
  res: NextApiResponse
) {
  const { clerkId, name, email } = req.body;

  const foundUser = await prisma.user.findUnique({ where: { clerkId } });

  if (!foundUser) {
    await prisma.user.create({
      data: { clerkId, name, email },
    });
    res.json({ message: "User created" });
  } else {
    res.json({ message: "User already exists" });
  }
}
