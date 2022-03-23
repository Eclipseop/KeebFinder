import type { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(404).end();
    return;
  }

  // @ts-ignore
  const data = await prisma.product.findMany({
    select: {
      from: true
    },
    distinct: ['from'],
  });
  res.status(200).json(data);
};