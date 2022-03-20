import { Product } from "@prisma/client";
import Item from "./Item";

type Props = {
    products: Product[],
    filter: string,
}

const ProductContainer = ({products, filter}: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 pt-4 h-full">
      {
        products
          .filter(product => filter === "all" ? true : product.from === filter)
          .filter((p) => parseInt(p.price.replace('$', '')) > 0)
          .map((p) => <Item key={p.id} product={p} />)
      }
    </div>
  );
};

export default ProductContainer;