const axios = require('axios');
const HTMLParser = require('node-html-parser');

const sites = [
  {
    name: 'kbdfans',
    url: 'https://kbdfans.com/collections/keycaps',
    root: ['.cc-product-list', '.product-block'],
    title: '.product-block__title',
    cost: '.theme-money',
    image: '.rimage-wrapper ' //we then use img -> data-src attribute
  },
  {
    name: 'keebsforall',
    url: 'https://keebsforall.com/collections/keycaps',
    root: ['.list-products', '.grid__cell'],
    title: '.product-item__title', 
    cost: '.product-item__price',
    image: '.product-item__image-wrapper'
  },
  {
    name: 'novelkeys',
    url: 'https://novelkeys.com/collections/keycaps',
    root: ['.three-column-grid', '.product-card'],
    title: '.product-card__title', 
    cost: '.price-item',
    image: '.product-card__image-wrapper'
  }
];

const pull = async (url, siteData) => {
  const { data } = await axios.get(url);
  const root = HTMLParser.parse(data);
  console.log(url);

  const products = root.querySelector(siteData.root[0]).querySelectorAll(siteData.root[1]);

  const productsJson = [];

  for (let product of products) {
    const name = product.querySelector(siteData.title).rawText.trim();
    const price = product.querySelector(siteData.cost).rawText.trim();

    let image = product.querySelector(siteData.image).querySelector("img").attributes['data-src'];
    if (image === undefined) {
      continue;
    }
    image = image.substring(2).replace('{width}', '1080');

    const link = siteData.url.replace('/collections/keycaps', '') + product.querySelector('a').attributes.href;

    productsJson.push({
      name, price, image, url: link, from: siteData.name
    });
  }
  return productsJson;
};

const getAllPages = async () => {
  const products = [];
  const site = sites[2];

  //for (let site of sites) {
  const p1 = await pull(site.url, site);
  p1.forEach((p) => products.push(p));

  for (let i = 2; i < 2; i++) {
    const url = `${site.url}?page=${i}`;
    const data = await pull(url, site);
    data.forEach((p) => products.push(p));
  }
  //}
  return products;
};

//getAllPages();


module.exports = {
  getAllPages
};