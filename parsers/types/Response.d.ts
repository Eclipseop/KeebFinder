export interface Response {
    plp: Plp;
    collections: Collections;
  }
export interface Plp {
    title: string;
    handle: string;
    products: Products;
  }
export interface Products {
    edges?: (EdgesEntity)[] | null;
  }
export interface EdgesEntity {
    node: Node;
  }
export interface Node {
    id: string;
    vendor: string;
    title: string;
    description: string;
    productType: string;
    handle: string;
    tags?: (string)[] | null;
    images: Images;
    variants: Variants;
    metafield: Metafield;
  }
export interface Images {
    edges?: (EdgesEntity1)[] | null;
  }
export interface EdgesEntity1 {
    node: Node1;
  }
export interface Node1 {
    altText?: string | null;
    originalSrc: string;
  }
export interface Variants {
    edges?: (EdgesEntity2)[] | null;
  }
export interface EdgesEntity2 {
    node: Node2;
  }
export interface Node2 {
    title: string;
    priceV2: PriceV2OrCompareAtPriceV2;
    compareAtPriceV2?: PriceV2OrCompareAtPriceV21 | null;
    quantityAvailable: number;
    metafield: Metafield;
  }
export interface PriceV2OrCompareAtPriceV2 {
    amount: string;
  }
export interface PriceV2OrCompareAtPriceV21 {
    amount: string;
  }
export interface Metafield {
    value: string;
  }
export interface Collections {
    edges?: (EdgesEntity3)[] | null;
  }
export interface EdgesEntity3 {
    node: Node3;
  }
export interface Node3 {
    title: string;
    handle: string;
  }
  