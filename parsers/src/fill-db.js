const { getAllPages } = require('./html-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const main = async () => {
  const products = await getAllPages();
  
  for (let product of products) {
    const prismaRes = await prisma.product.create({
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