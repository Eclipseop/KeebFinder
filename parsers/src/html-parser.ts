import axios from 'axios';
import { parse } from 'node-html-parser';

type Site = {
  name: string,
  url: string,
  root: string[]
  title: string;
  price: string,
  image: string
}

type Product = {
  name: string,
  price: string,
  image: string,
  url: string,
  from: string
}

const sites: Site[] = [
  {
    name: 'kbdfans',
    url: 'https://kbdfans.com/collections/keycaps',
    root: ['.cc-product-list', '.product-block'],
    title: '.product-block__title',
    price: '.theme-money',
    image: '.rimage-wrapper ' //we then use img -> data-src attribute
  },
  {
    name: 'keebsforall',
    url: 'https://keebsforall.com/collections/keycaps',
    root: ['.list-products', '.grid__cell'],
    title: '.product-item__title', 
    price: '.product-item__price',
    image: '.product-item__image-wrapper'
  },
  {
    name: 'novelkeys',
    url: 'https://novelkeys.com/collections/keycaps',
    root: ['.three-column-grid', '.product-card'],
    title: '.product-card__title', 
    price: '.price-item',
    image: '.product-card__image-wrapper'
  }
];

const pull = async (url: string, siteData: Site): Promise<Product[]> => {
  const { data } = await axios.get(url);
  const root = parse(data);

  const products = root.querySelector(siteData.root[0])?.querySelectorAll(siteData.root[1]);

  const productsJson: Product[] = [];

  for (const product of products) {
    const name = product.querySelector(siteData.title).rawText.trim();
    const price = product.querySelector(siteData.price).rawText.trim();

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

export const getAllPages = async () => {
  const products: Product[] = [];
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