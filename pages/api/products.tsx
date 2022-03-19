import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(404).end();
    return;
  }

  const data = await prisma.product.findMany({
    take: 20
  });
  res.status(200).json(data);
};