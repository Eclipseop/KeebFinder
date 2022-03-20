import type { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(404).end();
    return;
  }

  const { type, offset } = req.query;

  // @ts-ignore
  const data = await prisma.product.findMany({
    where: {
      productType: type as string,
    },
    take: 20,
    skip: +offset
  });
  res.status(200).json(data);
};