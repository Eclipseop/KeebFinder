import type { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(404).end();
    return;
  }

  const { type, offset, company } = req.query;

  // @ts-ignore
  const data = await prisma.product.findMany({
    where: {
      type: type as string,
      company: {
        in: (company as string).split(',')
      }
    },
    take: 20,
    skip: +offset
  });
  res.status(200).json(data);
};