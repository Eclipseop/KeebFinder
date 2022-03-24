import { Product } from "@prisma/client";
import InfiniteScroll from "react-infinite-scroll-component";
import Item from "./Item";

type Props = {
    products: Product[],
    getMoreData: () => void;
}

const ProductContainer = ({products, getMoreData}: Props) => {
  return (
    <InfiniteScroll
      dataLength={products.length}
      next={getMoreData}
      hasMore={true}
      loader={''}
    >
      {
        products.length === 0 ? <p>Loading...</p>: null
      }
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 px-1 h-full pt-1">
        {
          products
            .filter((p) => +p.price > 0)
            .map((p) => <Item key={p.id} product={p} />)
        }
      </div>
    </InfiniteScroll>
  );
};

export default ProductContainer;