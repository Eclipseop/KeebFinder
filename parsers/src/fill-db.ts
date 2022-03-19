import { getAllPages } from './html-parser';
import { getProducts } from './graphql-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  // const products = await getAllPages();
  
  // for (const product of products) {
  //   await prisma.product.create({
  //     data: {
  //       name: product.name,
  //       price: product.price,
  //       image: product.image,
  //       url: product.url,
  //       from: product.from
  //     }
  //   });
  const products = await getProducts();
  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        image: product.image,
        url: product.url,
        from: product.from
      }
    });
  }   
};

main();