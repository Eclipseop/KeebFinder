import { Product } from "@prisma/client";

const Item = ({product}: { product: Product }) => {

  const abbreviate = (name: string) => {
    if (name.length < 40) return name;
  
    return name.substring(0, 40) + "...";
  };
  
  return (
    <div className="border rounded p-2 h-72 hover:ring ring-blue-200 flex flex-col bg-gray-100 border min-w-[275px]">
      <img 
        className="h-40 w-40 rounded" 
        alt="keyboard image"
        src={`${product.image.startsWith('http') ? '' : 'https://'}${product.image}`} 
      />
      <div className="flex-grow">
        <h1 title={product.name}>{abbreviate(product.name)}</h1>
        <h2>From: ${(+product.price).toFixed(2)}</h2>
      </div>
      <a href={product.url} target="_blank" className="bg-blue-500 hover:bg-blue-600 text-white w-full p-1 rounded text-center" rel="noreferrer">Buy on <span className="font-semibold">{product.company}</span></a>
    </div>
  );
};

export default Item;