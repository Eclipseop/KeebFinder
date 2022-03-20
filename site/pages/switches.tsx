import { Product } from "@prisma/client";
import { NextPage } from "next";
import { useState } from "react";
import useSWR from "swr";
import ProductContainer from "../components/ProductContainer";

const Keycaps: NextPage = () => {
  const {data} = useSWR("/api/products?type=switches", (url) => fetch(url).then(r => r.json()));
  const [filter, setFilter] = useState('all');

  if (!data) {
    return <p>Loading...</p>;
  }

  const products: Product[] = data;

  const getCompanies = () => {
    const companies = new Set<string>();
    products.forEach(product => companies.add(product.from));
    return Array.from(companies);
  };

  return (
    <div className="flex flex-col">
      <select className="w-full border p-1 rounded" onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        {
          getCompanies().map(company => <option value={company} key={company}>{company}</option>)
        }
      </select>
      <ProductContainer products={products} filter={filter} />
    </div>
  );
};

export default Keycaps;