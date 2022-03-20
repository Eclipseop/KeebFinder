import { Product } from "@prisma/client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import ProductContainer from "../components/ProductContainer";

const Keycaps: NextPage = () => {
  const [filter, setFilter] = useState('all');

  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(20);

  useEffect(() => {
    const get = async () => {
      const data = await (await fetch('/api/products?type=keycaps&offset=0')).json();
      setProducts(data);
    };
    get();
  }, []);

  const getMoreData = async () => {
    setOffset(offset + 20);
    const data = await (await fetch(`/api/products?type=keycaps&offset=${offset}`)).json();
    const newArr = products.concat(data);
    setProducts(newArr);
  };

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
      <ProductContainer products={products} filter={filter} getMoreData={getMoreData} />
    </div>
  );
};

export default Keycaps;