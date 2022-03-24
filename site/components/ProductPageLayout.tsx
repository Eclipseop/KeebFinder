import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import CompanySelector from "./CompanySelector";
import ProductContainer from "./ProductContainer";

type Props = {
    productType: string
}

const ProductPageLayout = ({productType}: Props) => {
  const [filter, setFilter] = useState<string[]>([]);

  const [products, setProducts] = useState<Product[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [offset, setOffset] = useState(20);
  
  useEffect(() => {
    const get = async () => {
      const productData = await (await fetch(`/api/products?type=${productType}&offset=0&company=${filter.join(',')}`)).json();
      setProducts(productData);
  
      const companyData: {company: string}[] = await (await fetch(`/api/company`)).json();
      setCompanies(companyData.map(c => c.company));
      if (filter.length == 0) setFilter(companyData.map(c => c.company));
    };
    get();
  }, [filter]);
  
  const getMoreData = async () => {
    setOffset(offset + 20);
    const data = await (await fetch(`/api/products?type=${productType}&offset=${offset}&company=${filter}`)).json();
    const newArr = products.concat(data);
    setProducts(newArr);
  };
  
  const handleCheckboxClick = (company: string) => {
    const newFilter = filter.includes(company) ? filter.filter(c => c !== company) : [...filter, company];
    setFilter(newFilter);
  
  };

  return (
    <div className="flex flex-col">
      <CompanySelector 
        companies={companies}
        selectedCompanies={filter}
        click={(c) => handleCheckboxClick(c)}
      />
      <ProductContainer products={products} getMoreData={getMoreData} />
    </div>
  );
};

export default ProductPageLayout;