import { Product } from "@prisma/client";
import { NextPage } from "next";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json());

const Item = ({product}: { product: Product }) => {

  const abbreviate = (title: string) => {
    if (title.length < 50) return title;

    return title.substring(0, 50) + "...";
  };

  return (
    <div className="border rounded p-2 h-72 hover:ring ring-blue-100 flex flex-col">
      <img className="h-40 w-40 transition-height ease-in-out duration-300 hover:absolute hover:h-96 hover:w-96" src={`https://${product.image}`} />
      <h1>{abbreviate(product.name)}</h1>
      <h2>{product.price}</h2>
      <a href={product.url} className="bg-blue-500 hover:bg-blue-600 text-white w-full p-1 rounded mt-1 text-center">Buy on <span className="font-semibold">{product.from}</span></a>
    </div>
  );
};

const Home: NextPage = () => {
  const {data} = useSWR("/api/products", fetcher);

  if (!data) {
    return <p>Loading...</p>;
  }

  const products: Product[] = data;

  return (
    <div className="flex min-h-screen w-2/3 justify-center mx-auto">
      <div className="grid grid-cols-3 w-full gap-4 pt-4 h-full">
        {
          products.filter((p) => parseInt(p.price.substring(1)) > 0).map((p) => <Item key={p.name} product={p} />)
        }
      </div>
    </div>
  );
};

export default Home;