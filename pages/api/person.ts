// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "../../lib/prisma";
import { Person } from "../../types";

const prisma = new PrismaClient();

const createVote = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Parse the stringifed body
  const personData: Person = JSON.parse(req.body);

  const savedData = await prisma.person.create({
    data: personData,
  });

  res.json(savedData);
};

export default createVote;
