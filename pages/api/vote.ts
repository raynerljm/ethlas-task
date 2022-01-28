// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "../../lib/prisma";
import { Vote } from "../../types";

const prisma = new PrismaClient();

const createVote = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Parse the stringifed body
  const voteData: Vote = JSON.parse(req.body);

  const savedData = await prisma.vote.create({
    data: voteData,
  });

  res.json(savedData);
};

export default createVote;
