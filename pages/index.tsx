import { NextPage } from "next";
import useSWR from "swr";

type Product = {
  name: string,
  price: string,
  image: string,
  url: string,
  from: string
}

const fetcher = (url: string) => fetch(url).then(r => r.json());

const Item = ({name, price, image, from, url}: Product) => {
  console.log(from);

  const abbreviate = (title: string) => {
    if (title.length < 50) return title;

    return title.substring(0, 50) + "...";
  };

  return (
    <div className="border rounded p-2 h-72 hover:ring ring-blue-100 flex flex-col">
      <img className="h-40 w-40 transition-height ease-in-out duration-300 hover:absolute hover:h-96 hover:w-96" src={`https://${image}`} />
      <h1>{abbreviate(name)}</h1>
      <h2>{price}</h2>
      <a href={url} className="bg-blue-500 hover:bg-blue-600 text-white w-full p-1 rounded mt-1 text-center">Buy on <span className="font-semibold">{from}</span></a>
    </div>
  );
};

const Home: NextPage = () => {
  const {data} = useSWR("/api/products", fetcher);

  if (!data) {
    return <p>Loading...</p>;
  }

  const products: Product[] = data;

  console.log(products);

  return (
    <div className="flex min-h-screen w-2/3 justify-center mx-auto">
      <div className="grid grid-cols-3 w-full gap-4 pt-4 h-full">
        {
          products.filter((p) => parseInt(p.price.substring(1)) > 0).map((p) => <Item key={p.name} from={p.from} url={p.url} name={p.name} price={p.price} image={p.image} />)
        }
      </div>
    </div>
  );
};

export default Home;