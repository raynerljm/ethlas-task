// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { PersonImage } from "../../types";

const createVote = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Parse the stringifed body
  const personImageData: PersonImage = JSON.parse(req.body);

  const savedData = await prisma.personImage.create({
    data: personImageData,
  });

  res.json(savedData);
};

export default createVote;
