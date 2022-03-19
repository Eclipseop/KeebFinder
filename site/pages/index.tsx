import { Product } from "@prisma/client";
import { NextPage } from "next";
import { useState } from "react";
import useSWR from "swr";
import Item from "../components/Item";

const Home: NextPage = () => {
  const {data} = useSWR("/api/products", (url) => fetch(url).then(r => r.json()));
  const [filter, setFilter] = useState('all');

  if (!data) {
    return <p>Loading...</p>;
  }

  const products: Product[] = data;

  return (
    <div className="flex flex-col min-h-screen w-5/6 lg:w-2/3 justify-center mx-auto py-4">
      <select className="w-full border p-1 rounded" onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="kbdfans">KBDFans</option>
        <option value="keebsforall">KeebsForAll</option>
        <option value="novelkeys">NovelKeys</option>
        <option value="kineticlabs">KineticLabs</option>
        <option value="thekeycompany">The Key Company</option>
      </select>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 pt-4 h-full">
        {
          products
            .filter(product => filter === "all" ? true : product.from === filter)
            .filter((p) => parseInt(p.price.replace('$', '')) > 0)
            .map((p) => <Item key={p.id} product={p} />)
        }
      </div>
    </div>
  );
};

export default Home;