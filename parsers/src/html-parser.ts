import axios from 'axios';
import { parse } from 'node-html-parser';

type Site = {
  name: string,
  baseUrl: string,
  keycapUrl: string,
  switchUrl: string,
  root: string[]
  title: string;
  price: string,
  image: string
}

export type Product = {
  name: string,
  price: string,
  image: string,
  url: string,
  from: string,
  productType: string,
}

const sites: Site[] = [
  {
    name: 'kbdfans',
    baseUrl: 'https://kbdfans.com',
    keycapUrl: 'https://kbdfans.com/collections/keycaps',
    switchUrl: 'https://kbdfans.com/collections/switches',
    root: ['.cc-product-list', '.product-block'],
    title: '.product-block__title',
    price: '.theme-money',
    image: '.rimage-wrapper ' //we then use img -> data-src attribute
  },
  {
    name: 'keebsforall',
    baseUrl: 'https://keebsforall.com',
    keycapUrl: 'https://keebsforall.com/collections/keycaps',
    switchUrl: 'https://keebsforall.com/collections/mx-keyboard-switches',
    root: ['.list-products', '.grid__cell'],
    title: '.product-item__title', 
    price: '.product-item__price',
    image: '.product-item__image-wrapper'
  },
  {
    name: 'novelkeys',
    baseUrl: 'https://novelkeys.com',
    keycapUrl: 'https://novelkeys.com/collections/keycaps',
    switchUrl: 'https://novelkeys.com/collections/switches',
    root: ['.three-column-grid', '.product-card'],
    title: '.product-card__title', 
    price: '.price-item',
    image: '.product-card__image-wrapper'
  },
  {
    name: 'thekeycompany',
    baseUrl: 'https://thekey.company',
    keycapUrl: 'https://thekey.company/collections/in-stock/keycaps',
    switchUrl: 'https://thekey.company/collections/in-stock/switches',
    root: ['.grid-product__grid', '.grid-product__grid-item'],
    title: '.grid-product__title', 
    price: '.grid-product__price',
    image: '.grid-product__image-wrapper'
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

    const link = siteData.baseUrl.replace('/collections/keycaps', '') + product.querySelector('a').attributes.href;

    productsJson.push({
      name, price, image, url: link, from: siteData.name, productType: url.includes('keycaps') ? 'keycaps' : 'switches'
    });
  }
  return productsJson;
};

export const getAllPages = async () => {
  const products: Product[] = [];
  //const site = sites[0];

  for (const site of sites) {
    const basePageKeyCaps = await pull(site.keycapUrl, site);
    const basePageSwitches = await pull(site.switchUrl, site);
    basePageKeyCaps.forEach(p => products.push(p));
    basePageSwitches.forEach(p => products.push(p));
  
    for (let i = 2; i < 20; i++) {
      const keyCapUrl = `${site.keycapUrl}?page=${i}`;
      const switchUrl = `${site.switchUrl}?page=${i}`;
  
      const keyCapData = await pull(keyCapUrl, site);
      const switchData = await pull(switchUrl, site);
  
      keyCapData.forEach(p => products.push(p));
      switchData.forEach(p => products.push(p));
    }
  }

  //console.log(products);
  return products;
};

//getAllPages();