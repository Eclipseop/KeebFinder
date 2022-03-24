import { getAllPages } from './html-parser';
import { getAllProducts } from './graphql-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const res = await prisma.product.deleteMany({});

  const htmlProducts = await getAllPages();
  const gqlProducts = await getAllProducts();

  for (const product of htmlProducts.concat(gqlProducts)) {
    console.log(`Attemping to insert ${JSON.stringify(product)}`);
    await prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        image: product.image,
        url: product.url,
        company: product.comapny,
        type: product.type,
      }
    });
  }   
};

main();