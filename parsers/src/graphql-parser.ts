import { gql, GraphQLClient } from 'graphql-request';
import 'dotenv/config';
import { Response } from '../types/Response';
import { Product } from './html-parser';

const query = gql`
query plpDataAll($plpHandle: String!, $limit: Int!) {
    plp: collectionByHandle(handle: $plpHandle) {
      title
      handle
      products(first: $limit) {
        ...productsPlpInfoNew
      }
    }
  
    collections(first: 250) {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
  
  fragment productsPlpInfoNew on ProductConnection {
    edges {
      node {
        id
        vendor
        title
        description
        productType
        handle
        tags
  
        images(first: 100, maxWidth: 600) {
          edges {
            node {
              altText
              originalSrc
            }
          }
        }
  
        variants(first: 100) {
          edges {
            node {
              title
              priceV2 {
                amount
              }
              compareAtPriceV2 {
                amount
              }
              quantityAvailable
  
              metafield(namespace: "all", key: "data") {
                value
              }
            }
          }
        }
  
        metafield(namespace: "all", key: "data") {
          value
        }
      }
    }
  }
  
`;

const client = new GraphQLClient('https://auth.kineticlabs.store/api/2020-10/graphql', { headers: {
  'accept': 'application/json',
  'x-shopify-storefront-access-token': process.env.SHOPIFY_TOKEN
} });

export const getProducts = async (handle: string): Promise<Product[]> => {
  const products: Product[] = [];

  const res: Response = await client.request(query, {
    "plpHandle": handle,
    "limit": 100
  });
  for (const edge of res.plp.products.edges) {
    console.log(`Parsing Graphql note`);
    const productNode = edge.node;

    const meta = JSON.parse(productNode.metafield.value);

    products.push({
      name: productNode.title,
      comapny: 'kineticlabs',
      price: +productNode.variants.edges[0].node.priceV2.amount,
      image: productNode.images.edges[0].node.originalSrc,
      url: meta['seo']['url'],
      type: handle,
    });
  }

  return products;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const products: Product[] = [];

  const handles = ['keycaps', 'switches'];
  for (const handle of handles) {
    const res = await getProducts(handle);
    res.forEach(p => products.push(p));
  }

  return products;
};

//getProducts();
